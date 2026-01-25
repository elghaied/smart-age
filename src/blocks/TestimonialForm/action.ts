'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type TestimonialData = {
  author: string
  occupation?: string
  content: string
  rating: number
  recaptchaToken?: string
}

type ActionResult = {
  success: boolean
  error?: string
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.NEXT_PRIVATE_RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('NEXT_PRIVATE_RECAPTCHA_SECRET_KEY is not configured')
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

export async function submitTestimonial(
  data: TestimonialData,
  requireRecaptcha: boolean = false,
): Promise<ActionResult> {
  const { author, occupation, content, rating, recaptchaToken } = data

  // Validate required fields
  if (!author || typeof author !== 'string' || author.trim().length === 0) {
    return { success: false, error: 'Name is required' }
  }

  if (!content || typeof content !== 'string' || content.trim().length < 20) {
    return { success: false, error: 'Testimonial content must be at least 20 characters' }
  }

  // Validate rating
  const ratingNum = Number(rating)
  if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    return { success: false, error: 'Rating must be between 1 and 5' }
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

    // Create testimonial as draft (unpublished) for moderation
    await payload.create({
      collection: 'testimonials',
      draft: true,
      data: {
        author: author.trim(),
        occupation: occupation?.trim() || undefined,
        content: content.trim(),
        rating: ratingNum,
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error creating testimonial:', error)
    return { success: false, error: 'Failed to submit testimonial' }
  }
}
