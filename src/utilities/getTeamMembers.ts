import type { TeamMember } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'

async function getTeamMembers(locale?: TypedLocale) {
  const payload = await getPayload({ config: configPromise })

  const teamMembers = await payload.find({
    collection: 'team-members',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
    locale,
  })

  return teamMembers.docs as TeamMember[]
}

/**
 * Returns a cached function to get all active team members
 */
export const getCachedTeamMembers = (locale?: TypedLocale) =>
  unstable_cache(async () => getTeamMembers(locale), ['team-members', locale || 'en'], {
    tags: ['team-members'],
  })
