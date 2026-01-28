'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ReCAPTCHA from 'react-google-recaptcha'
import { submitApplication } from '../../actions/application-submit-form'
import { FormFeedback, FormLoadingOverlay } from '@/components/FormFeedback'
import type { TypedLocale } from 'payload'

type FormData = {
  applicantName: string
  email: string
  cv: FileList
}

export type ApplicationFormProps = {
  positionApplied?: string
  locale: TypedLocale
  className?: string
}

const ALLOWED_EXTENSIONS = '.pdf,.doc,.docx'
const ALLOWED_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE_MB = 10

const translations = {
  en: {
    name: 'Name',
    namePlaceholder: 'Your full name',
    nameRequired: 'Name is required',
    email: 'Email',
    emailPlaceholder: 'your.email@example.com',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    cv: 'CV / Resume',
    cvRequired: 'Please upload your CV',
    cvDragDrop: 'Drag and drop your CV here, or click to browse',
    cvFileTypes: `PDF, DOC, or DOCX (max ${MAX_FILE_SIZE_MB}MB)`,
    cvFileTypeError: 'Only PDF and Word documents are allowed',
    cvFileSizeError: `File size must be less than ${MAX_FILE_SIZE_MB}MB`,
    submitButton: 'Submit Application',
    submitting: 'Submitting, please wait...',
    recaptchaError: 'Please complete the reCAPTCHA.',
    successMessage: 'Thank you for your application! We will review it and get back to you soon.',
  },
  ar: {
    name: 'الاسم',
    namePlaceholder: 'اسمك الكامل',
    nameRequired: 'الاسم مطلوب',
    email: 'البريد الإلكتروني',
    emailPlaceholder: 'your.email@example.com',
    emailRequired: 'البريد الإلكتروني مطلوب',
    emailInvalid: 'يرجى إدخال بريد إلكتروني صحيح',
    cv: 'السيرة الذاتية',
    cvRequired: 'يرجى تحميل السيرة الذاتية',
    cvDragDrop: 'اسحب وأفلت سيرتك الذاتية هنا، أو انقر للتصفح',
    cvFileTypes: `PDF أو DOC أو DOCX (بحد أقصى ${MAX_FILE_SIZE_MB} ميجابايت)`,
    cvFileTypeError: 'مسموح فقط بمستندات PDF و Word',
    cvFileSizeError: `يجب أن يكون حجم الملف أقل من ${MAX_FILE_SIZE_MB} ميجابايت`,
    submitButton: 'إرسال الطلب',
    submitting: 'جاري الإرسال، يرجى الانتظار...',
    recaptchaError: 'يرجى إكمال التحقق.',
    successMessage: 'شكراً لتقديمك! سنراجع طلبك ونتواصل معك قريباً.',
  },
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({
  positionApplied = 'General Application',
  locale,
  className,
}) => {
  const t = translations[locale as keyof typeof translations] || translations.en

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
    const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024

    if (file.size > maxSizeBytes) {
      return t.cvFileSizeError
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return t.cvFileTypeError
    }

    return null
  }

  const onSubmit = async (data: FormData) => {
    setError(undefined)

    const captchaValue = recaptcha.current?.getValue()

    if (!captchaValue) {
      setError(t.recaptchaError)
      return
    }

    if (!data.cv || data.cv.length === 0) {
      setError(t.cvRequired)
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
      formData.append('recaptchaToken', captchaValue)

      const result = await submitApplication(formData, true)

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
    required: t.cvRequired,
    validate: {
      fileType: (files) => {
        if (!files || files.length === 0) return true
        const file = files[0]
        if (!ALLOWED_TYPES.includes(file.type)) {
          return t.cvFileTypeError
        }
        return true
      },
      fileSize: (files) => {
        if (!files || files.length === 0) return true
        const file = files[0]
        const maxSizeBytes = MAX_FILE_SIZE_MB * 1024 * 1024
        if (file.size > maxSizeBytes) {
          return t.cvFileSizeError
        }
        return true
      },
    },
  })

  return (
    <div className={className}>
      <div className="relative p-4 lg:p-6 border border-border rounded-[0.8rem] bg-card">
        <FormLoadingOverlay visible={isLoading && !hasSubmitted} message={t.submitting} />

        <FormFeedback type="success" message={hasSubmitted ? t.successMessage : undefined} visible={hasSubmitted} className="mb-4" />

        <FormFeedback type="error" message={error} visible={!!error} className="mb-4" />

        {!hasSubmitted && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="applicantName">{t.name} *</Label>
              <Input
                id="applicantName"
                placeholder={t.namePlaceholder}
                {...register('applicantName', { required: t.nameRequired })}
              />
              {errors.applicantName && (
                <p className="text-red-500 text-sm">{errors.applicantName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t.email} *</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.emailPlaceholder}
                {...register('email', {
                  required: t.emailRequired,
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t.emailInvalid,
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">{t.cv} *</Label>
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
                      <p className="mt-2 text-sm text-muted-foreground">{t.cvDragDrop}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t.cvFileTypes}</p>
                    </>
                  )}
                </div>
              </div>
              {errors.cv && <p className="text-red-500 text-sm">{errors.cv.message}</p>}
            </div>

            <div className="flex justify-center">
              <div className="overflow-hidden">
                <ReCAPTCHA
                  ref={recaptcha}
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
                  theme="dark"
                />
              </div>
            </div>

            <Button type="submit" variant="default" size="lg">
              {t.submitButton}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
