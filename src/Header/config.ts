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
    {
      name: 'homeSections',
      type: 'array',
      label: {
        en: 'Homepage Section Navigation',
        ar: 'التنقل في أقسام الصفحة الرئيسية',
      },
      admin: {
        description: {
          en: 'Section links that appear as a secondary navigation bar on the homepage only',
          ar: 'روابط الأقسام التي تظهر كشريط تنقل ثانوي في الصفحة الرئيسية فقط',
        },
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Label',
            ar: 'العنوان',
          },
        },
        {
          name: 'sectionId',
          type: 'text',
          required: true,
          label: {
            en: 'Section ID',
            ar: 'معرف القسم',
          },
          admin: {
            description: {
              en: 'The HTML id of the section (e.g., "about", "services", "projects")',
              ar: 'معرف HTML للقسم (مثل "about"، "services"، "projects")',
            },
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
