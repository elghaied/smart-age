import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Value } from '@/payload-types'

export const revalidateValue: CollectionAfterChangeHook<Value> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating values`)
      revalidatePath('/')
      revalidateTag('values')
    }
  }
  return doc
}

export const revalidateValueDelete: CollectionAfterDeleteHook<Value> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating values after delete`)
    revalidatePath('/')
    revalidateTag('values')
  }

  return doc
}
