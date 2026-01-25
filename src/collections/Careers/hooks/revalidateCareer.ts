import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Career, Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Career> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/careers/${doc.slug}`

      payload.logger.info(`Revalidating career at path: ${path}`)

      revalidatePath(path)
      revalidateTag('careers-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/careers/${previousDoc.slug}`

      payload.logger.info(`Revalidating old career at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('careers-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Career> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/careers/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('careers-sitemap')
  }

  return doc
}
