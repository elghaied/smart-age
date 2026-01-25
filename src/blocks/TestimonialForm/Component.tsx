'use client'

import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import ReCAPTCHA from 'react-google-recaptcha'
import { submitTestimonial } from './action'

type FormData = {
  author: string
  occupation: string
  content: string
  rating: number
}

export type TestimonialFormBlockType = {
  blockName?: string
  blockType?: 'testimonialForm'
  enableIntro?: boolean
  introContent?: DefaultTypedEditorState
  successMessage?: DefaultTypedEditorState
  submitButtonLabel?: string
  requireRecaptcha?: boolean
}

const StarRating: React.FC<{
  value: number
  onChange: (value: number) => void
}> = ({ value, onChange }) => {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
          className="text-2xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-venetian rounded"
          aria-label={`Rate ${star} stars`}
        >
          <span
            className={
              (hoverValue || value) >= star
                ? 'text-venetian'
                : 'text-argent dark:text-argent/50'
            }
          >
            ★
          </span>
        </button>
      ))}
    </div>
  )
}

export const TestimonialFormBlock: React.FC<
  {
    id?: string
  } & TestimonialFormBlockType
> = (props) => {
  const {
    enableIntro,
    introContent,
    successMessage,
    submitButtonLabel = 'Submit Testimonial',
    requireRecaptcha = true,
  } = props

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      author: '',
      occupation: '',
      content: '',
      rating: 5,
    },
  })

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const recaptcha = useRef<ReCAPTCHA>(null)

  const rating = watch('rating')

  const onSubmit = async (data: FormData) => {
    setError(undefined)

    const captchaValue = recaptcha.current?.getValue()

    if (requireRecaptcha && !captchaValue) {
      setError('Please complete the reCAPTCHA.')
      return
    }

    setIsLoading(true)

    try {
      const result = await submitTestimonial(
        {
          ...data,
          recaptchaToken: captchaValue || undefined,
        },
        requireRecaptcha,
      )

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
            Thank you for your testimonial! It will be reviewed shortly.
          </p>
        ) : null}

        {isLoading && !hasSubmitted && <p className="text-center">Submitting, please wait...</p>}

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        {!hasSubmitted && !isLoading && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="author">Name *</Label>
              <Input
                id="author"
                placeholder="Your name"
                {...register('author', { required: 'Name is required' })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                placeholder="Your job title or company"
                {...register('occupation')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Your Testimonial *</Label>
              <Textarea
                id="content"
                placeholder="Share your experience..."
                rows={5}
                {...register('content', {
                  required: 'Testimonial content is required',
                  minLength: {
                    value: 20,
                    message: 'Please write at least 20 characters',
                  },
                })}
              />
              {errors.content && (
                <p className="text-red-500 text-sm">{errors.content.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <StarRating
                value={rating}
                onChange={(value) => setValue('rating', value)}
              />
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

            <Button type="submit" variant="gshell" size="gshell">
              {submitButtonLabel}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
