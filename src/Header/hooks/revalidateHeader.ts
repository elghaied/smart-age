import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'
import { locales } from '@/i18n/localization'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    // Revalidate cache for all locales
    for (const locale of locales) {
      revalidateTag(`global_header_${locale}`)
    }
    revalidateTag('global_header_default')
  }

  return doc
}
