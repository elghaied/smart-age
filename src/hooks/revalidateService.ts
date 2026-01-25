import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '@/payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating services`)
      revalidatePath('/')
      revalidateTag('services')
    }
  }
  return doc
}

export const revalidateServiceDelete: CollectionAfterDeleteHook<Service> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating services after delete`)
    revalidatePath('/')
    revalidateTag('services')
  }

  return doc
}
