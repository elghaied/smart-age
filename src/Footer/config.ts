import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    ar: 'التذييل',
  },
  access: {
    read: () => true,
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
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'footerLabels',
      type: 'group',
      label: {
        ar: 'عنوان الفوتر',
        en: 'footer labels',
      },
      fields: [
        {
          name: 'footerWording',
          type: 'text',
          localized: true,
          label: {
            ar: 'كلمة الفوتر',
            en: 'footer wording',
          },
        },
        {
          name: 'footerQuickLinksLabel',
          type: 'text',
          defaultValue: 'Quick Links',
          localized: true,
          label: {
            ar: 'روابط سريعة',
            en: 'quick links',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
