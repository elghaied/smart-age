'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { locales } from '@/i18n/localization'

type LocalizedSlugs = {
  en?: string
  fr?: string
  ar?: string
} | null

export async function getLocalizedSlugs(
  collection: 'posts' | 'pages' | 'careers',
  slug: string,
): Promise<LocalizedSlugs> {
  try {
    const payload = await getPayload({ config })

    // Build OR conditions to check slug in all locales
    const localizedSlugConditions = locales.map((locale) => ({
      [`slug.${locale}`]: {
        equals: slug,
      },
    }))

    // Find the document by checking slug across all locales
    const result = await payload.find({
      collection,
      where: {
        or: localizedSlugConditions,
      },
      locale: 'all',
      limit: 1,
      select: {
        slug: true,
      },
    })

    // If no document found, return null
    if (!result.docs[0]) {
      return null
    }

    return result.docs[0].slug as LocalizedSlugs
  } catch (error) {
    console.error('Error fetching localized slugs:', error)
    return null
  }
}
