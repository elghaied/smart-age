'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import ReCAPTCHA from 'react-google-recaptcha'
import { submitApplication } from './action'

type FormData = {
  applicantName: string
  email: string
  cv: FileList
}

export type ApplicationFormBlockType = {
  blockName?: string
  blockType?: 'applicationForm'
  enableIntro?: boolean
  introContent?: DefaultTypedEditorState
  successMessage?: DefaultTypedEditorState
  submitButtonLabel?: string
  requireRecaptcha?: boolean
  maxFileSizeMB?: number
  positionApplied?: string
}

const ALLOWED_EXTENSIONS = '.pdf,.doc,.docx'
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

export const ApplicationFormBlock: React.FC<
  {
    id?: string
  } & ApplicationFormBlockType
> = (props) => {
  const {
    enableIntro,
    introContent,
    successMessage,
    submitButtonLabel = 'Submit Application',
    requireRecaptcha = true,
    maxFileSizeMB = 10,
    positionApplied = '',
  } = props

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      applicantName: '',
      email: '',
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [dragActive, setDragActive] = useState(false)
  const recaptcha = useRef<ReCAPTCHA>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const watchedCv = watch('cv')
  const selectedFile = watchedCv?.[0]

  const validateFile = (file: File): string | null => {
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024

    if (file.size > maxSizeBytes) {
      return `File size must be less than ${maxFileSizeMB}MB`
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Only PDF and Word documents (.pdf, .doc, .docx) are allowed'
    }

    return null
  }

  const onSubmit = async (data: FormData) => {
    setError(undefined)

    const captchaValue = recaptcha.current?.getValue()

    if (requireRecaptcha && !captchaValue) {
      setError('Please complete the reCAPTCHA.')
      return
    }

    if (!data.cv || data.cv.length === 0) {
      setError('Please upload your CV')
      return
    }

    const file = data.cv[0]
    const fileError = validateFile(file)
    if (fileError) {
      setError(fileError)
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append('applicantName', data.applicantName)
      formData.append('email', data.email)
      formData.append('positionApplied', positionApplied)
      formData.append('cv', file)
      if (captchaValue) {
        formData.append('recaptchaToken', captchaValue)
      }

      const result = await submitApplication(formData, requireRecaptcha, maxFileSizeMB)

      if (!result.success) {
        setError(result.error || 'Something went wrong. Please try again.')
        setIsLoading(false)
        recaptcha.current?.reset()
        return
      }

      setIsLoading(false)
      setHasSubmitted(true)
      recaptcha.current?.reset()
      reset()
    } catch {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
      recaptcha.current?.reset()
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      const fileError = validateFile(file)
      if (fileError) {
        setError(fileError)
        return
      }

      // Create a DataTransfer object to set the files
      const dt = new DataTransfer()
      dt.items.add(file)

      if (fileInputRef.current) {
        fileInputRef.current.files = dt.files
        // Trigger change event for react-hook-form
        const event = new Event('change', { bubbles: true })
        fileInputRef.current.dispatchEvent(event)
      }
    }
  }

  const { ref: registerRef, ...cvRegister } = register('cv', {
    required: 'Please upload your CV',
    validate: {
      fileType: (files) => {
        if (!files || files.length === 0) return true
        const file = files[0]
        if (!ALLOWED_TYPES.includes(file.type)) {
          return 'Only PDF and Word documents are allowed'
        }
        return true
      },
      fileSize: (files) => {
        if (!files || files.length === 0) return true
        const file = files[0]
        const maxSizeBytes = maxFileSizeMB * 1024 * 1024
        if (file.size > maxSizeBytes) {
          return `File size must be less than ${maxFileSizeMB}MB`
        }
        return true
      },
    },
  })

  return (
    <div className="container lg:max-w-[48rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem] dark:bg-[#212121]">
        {hasSubmitted && successMessage ? (
          <RichText data={successMessage} />
        ) : hasSubmitted ? (
          <p className="text-center text-lg">
            Thank you for your application! We will review it and get back to you soon.
          </p>
        ) : null}

        {isLoading && !hasSubmitted && <p className="text-center">Submitting, please wait...</p>}

        {error && <div className="mb-4 text-red-500 text-sm text-center">{error}</div>}

        {!hasSubmitted && !isLoading && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">Name *</Label>
              <Input
                id="applicantName"
                placeholder="Your full name"
                {...register('applicantName', { required: 'Name is required' })}
              />
              {errors.applicantName && (
                <p className="text-red-500 text-sm">{errors.applicantName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV / Resume *</Label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  dragActive
                    ? 'border-venetian bg-venetian/5'
                    : 'border-border hover:border-venetian/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  id="cv"
                  type="file"
                  accept={ALLOWED_EXTENSIONS}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  {...cvRegister}
                  ref={(e) => {
                    registerRef(e)
                    fileInputRef.current = e
                  }}
                />
                <div className="text-center">
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg
                        className="w-6 h-6 text-venetian"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span className="text-foreground font-medium">{selectedFile.name}</span>
                      <span className="text-muted-foreground text-sm">
                        ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </span>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto w-10 h-10 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop your CV here, or click to browse
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        PDF, DOC, or DOCX (max {maxFileSizeMB}MB)
                      </p>
                    </>
                  )}
                </div>
              </div>
              {errors.cv && <p className="text-red-500 text-sm">{errors.cv.message}</p>}
            </div>

            {requireRecaptcha && (
              <div className="flex justify-center">
                <div className="overflow-hidden">
                  <ReCAPTCHA
                    ref={recaptcha}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                    theme="dark"
                  />
                </div>
              </div>
            )}

            <Button type="submit" variant="default" size="lg">
              {submitButtonLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
