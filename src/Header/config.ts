import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    ar: 'الرأس',
  },
  access: {
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: {
      en: 'Navigation',
      ar: 'التنقل',
    },
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      localized: true,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
