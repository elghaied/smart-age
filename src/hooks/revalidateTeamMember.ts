import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { TeamMember } from '@/payload-types'

export const revalidateTeamMember: CollectionAfterChangeHook<TeamMember> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc.isActive) {
      payload.logger.info(`Revalidating team members`)
      revalidatePath('/')
      revalidateTag('team-members')
    }
  }
  return doc
}

export const revalidateTeamMemberDelete: CollectionAfterDeleteHook<TeamMember> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating team members after delete`)
    revalidatePath('/')
    revalidateTag('team-members')
  }

  return doc
}
