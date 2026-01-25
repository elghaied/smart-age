import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { locales } from '@/i18n/localization'

export const revalidateContactInfo: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating contact info`)

    // Revalidate paths and tags for all locales
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
      revalidateTag(`global_contact-info_${locale}`)
    }
    revalidatePath('/')
  }

  return doc
}
