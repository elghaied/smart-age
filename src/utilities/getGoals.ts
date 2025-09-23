import type { Goal } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'

async function getGoals(locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const goals = await payload.find({
    collection: 'goals',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
    locale: locale as TypedLocale,
  })

  return goals.docs as Goal[]
}

/**
 * Returns a cached function to get all active goals
 */
export const getCachedGoals = (locale?: string) =>
  unstable_cache(async () => getGoals(locale), ['goals', locale || 'en'], {
    tags: ['goals'],
  })
