import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { locales } from '@/i18n/localization'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    // Revalidate cache for all locales
    for (const locale of locales) {
      revalidateTag(`global_footer_${locale}`)
    }
    revalidateTag('global_footer_default')
  }

  return doc
}
