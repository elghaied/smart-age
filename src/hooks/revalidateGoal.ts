import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Goal } from '@/payload-types'

export const revalidateGoal: CollectionAfterChangeHook<Goal> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating goals`)
      revalidatePath('/')
      revalidateTag('goals')
    }
  }
  return doc
}

export const revalidateGoalDelete: CollectionAfterDeleteHook<Goal> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating goals after delete`)
    revalidatePath('/')
    revalidateTag('goals')
  }

  return doc
}
