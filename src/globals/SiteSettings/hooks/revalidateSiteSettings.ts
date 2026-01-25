import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'
import { locales } from '@/i18n/localization'

export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating site settings`)

    // Revalidate paths and tags for all locales
    for (const locale of locales) {
      revalidatePath(`/${locale}`)
      revalidateTag(`global_site-settings_${locale}`)
    }
    revalidatePath('/')
  }

  return doc
}
