import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { Goal, Project, Service, TeamMember, Value } from '@/payload-types'

export const revalidateHomePage: CollectionAfterChangeHook<
  Goal | Service | Project | TeamMember | Value
> = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      const path = '/'

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('global_homepage')
      revalidateTag('pages-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<
  Goal | Service | Project | TeamMember | Value
> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = '/'
    revalidatePath(path)
    revalidateTag('global_homepage')

    revalidateTag('pages-sitemap')
  }

  return doc
}
