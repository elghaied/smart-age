import type { Project } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { unstable_cache } from 'next/cache'

async function getProjects(locale?: string) {
  const payload = await getPayload({ config: configPromise })

  const projects = await payload.find({
    collection: 'projects',
    where: {
      isActive: {
        equals: true,
      },
    },
    sort: 'order',
    locale: locale as TypedLocale,
  })

  return projects.docs as Project[]
}

/**
 * Returns a cached function to get all active projects
 */
export const getCachedProjects = (locale?: string) =>
  unstable_cache(async () => getProjects(locale), ['projects', locale || 'en'], {
    tags: ['projects'],
  })
