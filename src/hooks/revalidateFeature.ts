import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Feature } from '@/payload-types'

export const revalidateFeature: CollectionAfterChangeHook<Feature> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating features`)
      revalidatePath('/')
      revalidateTag('features')
    }
  }
  return doc
}

export const revalidateFeatureDelete: CollectionAfterDeleteHook<Feature> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating features after delete`)
    revalidatePath('/')
    revalidateTag('features')
  }

  return doc
}
