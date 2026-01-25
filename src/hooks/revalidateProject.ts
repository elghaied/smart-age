import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Project } from '@/payload-types'

export const revalidateProject: CollectionAfterChangeHook<Project> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating projects`)
      revalidatePath('/')
      revalidateTag('projects')
    }
  }
  return doc
}

export const revalidateProjectDelete: CollectionAfterDeleteHook<Project> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating projects after delete`)
    revalidatePath('/')
    revalidateTag('projects')
  }

  return doc
}
