'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type ActionResult = {
  success: boolean
  error?: string
}

// Allowed MIME types for CV uploads
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// File extensions mapping
const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx']

// Magic bytes for file type verification
const FILE_SIGNATURES: Record<string, number[][]> = {
  'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
  'application/msword': [[0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]], // DOC (OLE2)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    [0x50, 0x4b, 0x03, 0x04], // DOCX (ZIP-based)
    [0x50, 0x4b, 0x05, 0x06], // Empty DOCX
    [0x50, 0x4b, 0x07, 0x08], // Spanned DOCX
  ],
}

// Dangerous patterns to check in filenames
const DANGEROUS_PATTERNS = [
  /\.\./,
  /[<>:"|?*]/,
  /\x00/,
  /\.exe$/i,
  /\.bat$/i,
  /\.cmd$/i,
  /\.scr$/i,
  /\.js$/i,
  /\.vbs$/i,
  /\.ps1$/i,
  /\.sh$/i,
]

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured')
    return false
  }

  try {
    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' },
    )

    const data = await res.json()
    return data.success === true
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error)
    return false
  }
}

function verifyMagicBytes(buffer: ArrayBuffer, mimeType: string): boolean {
  const signatures = FILE_SIGNATURES[mimeType]
  if (!signatures) return false

  const bytes = new Uint8Array(buffer)

  return signatures.some((signature) => {
    if (bytes.length < signature.length) return false
    return signature.every((byte, index) => bytes[index] === byte)
  })
}

function sanitizeFilename(filename: string): string {
  // Remove path components
  const baseName = filename.split(/[\\/]/).pop() || filename

  // Replace dangerous characters
  return baseName.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 255)
}

function validateFilename(filename: string): boolean {
  return !DANGEROUS_PATTERNS.some((pattern) => pattern.test(filename))
}

function getFileExtension(filename: string): string {
  const match = filename.match(/\.[^.]+$/)
  return match ? match[0].toLowerCase() : ''
}

const MAX_FILE_SIZE_MB = 10

export async function submitApplication(
  formData: FormData,
  requireRecaptcha: boolean = true,
): Promise<ActionResult> {
  const applicantName = formData.get('applicantName') as string
  const email = formData.get('email') as string
  const positionApplied = formData.get('positionApplied') as string
  const recaptchaToken = formData.get('recaptchaToken') as string
  const cvFile = formData.get('cv') as File | null

  // Validate required fields
  if (!applicantName || typeof applicantName !== 'string' || applicantName.trim().length === 0) {
    return { success: false, error: 'Name is required' }
  }

  if (!email || typeof email !== 'string' || email.trim().length === 0) {
    return { success: false, error: 'Email is required' }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return { success: false, error: 'Please enter a valid email address' }
  }

  if (
    !positionApplied ||
    typeof positionApplied !== 'string' ||
    positionApplied.trim().length === 0
  ) {
    return { success: false, error: 'Position information is missing' }
  }

  // Validate CV file
  if (!cvFile || !(cvFile instanceof File) || cvFile.size === 0) {
    return { success: false, error: 'Please upload your CV' }
  }

  // Check file size
  const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024
  if (cvFile.size > maxSizeBytes) {
    return { success: false, error: `File size must be less than ${MAX_FILE_SIZE_MB}MB` }
  }

  // Validate filename
  if (!validateFilename(cvFile.name)) {
    return { success: false, error: 'Invalid filename. Please rename your file and try again.' }
  }

  // Check file extension
  const extension = getFileExtension(cvFile.name)
  if (!ALLOWED_EXTENSIONS.includes(extension)) {
    return {
      success: false,
      error: 'Only PDF and Word documents (.pdf, .doc, .docx) are allowed',
    }
  }

  // Verify MIME type
  if (!ALLOWED_MIME_TYPES.includes(cvFile.type)) {
    return {
      success: false,
      error: 'Invalid file type. Only PDF and Word documents are allowed',
    }
  }

  // Verify file content matches claimed type (magic bytes check)
  try {
    const buffer = await cvFile.arrayBuffer()

    if (!verifyMagicBytes(buffer, cvFile.type)) {
      return {
        success: false,
        error: 'File content does not match its type. Please upload a valid PDF or Word document.',
      }
    }
  } catch {
    return { success: false, error: 'Failed to verify file. Please try again.' }
  }

  // Verify reCAPTCHA if required
  if (requireRecaptcha) {
    if (!recaptchaToken) {
      return { success: false, error: 'Please complete the reCAPTCHA' }
    }

    const isValidRecaptcha = await verifyRecaptcha(recaptchaToken)
    if (!isValidRecaptcha) {
      return { success: false, error: 'reCAPTCHA verification failed. Please try again.' }
    }
  }

  try {
    const payload = await getPayload({ config })

    // Sanitize filename before upload
    const sanitizedFilename = sanitizeFilename(cvFile.name)

    // Upload the file to media collection
    const uploadedFile = await payload.create({
      collection: 'media',
      data: {
        alt: `CV - ${applicantName.trim()}`,
      },
      file: {
        data: Buffer.from(await cvFile.arrayBuffer()),
        mimetype: cvFile.type,
        name: sanitizedFilename,
        size: cvFile.size,
      },
    })

    // Create application document
    await payload.create({
      collection: 'applications',
      data: {
        applicantName: applicantName.trim(),
        email: email.trim().toLowerCase(),
        positionApplied: positionApplied.trim(),
        cv: uploadedFile.id,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating application:', error)
    return { success: false, error: 'Failed to submit application. Please try again.' }
  }
}
