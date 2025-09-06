import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Archive: Block = {
  slug: 'archive',
  interfaceName: 'ArchiveBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: {
        en: 'Intro Content',
        ar: 'المحتوى التمهيدي',
      },
      localized: true,
    },
    {
      name: 'populateBy',
      type: 'select',
      defaultValue: 'collection',
      label: {
        en: 'Populate By',
        ar: 'ملء بواسطة',
      },
      options: [
        {
          label: {
            en: 'Collection',
            ar: 'مجموعة',
          },
          value: 'collection',
        },
        {
          label: {
            en: 'Individual Selection',
            ar: 'اختيار فردي',
          },
          value: 'selection',
        },
      ],
    },
    {
      name: 'relationTo',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      defaultValue: 'posts',
      label: {
        en: 'Collections To Show',
        ar: 'المجموعات المراد عرضها',
      },
      options: [
        {
          label: {
            en: 'Posts',
            ar: 'المقالات',
          },
          value: 'posts',
        },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
      },
      hasMany: true,
      label: {
        en: 'Categories To Show',
        ar: 'الفئات المراد عرضها',
      },
      relationTo: 'categories',
    },
    {
      name: 'limit',
      type: 'number',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'collection',
        step: 1,
      },
      defaultValue: 10,
      label: {
        en: 'Limit',
        ar: 'الحد الأقصى',
      },
    },
    {
      name: 'selectedDocs',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData.populateBy === 'selection',
      },
      hasMany: true,
      label: {
        en: 'Selection',
        ar: 'الاختيار',
      },
      relationTo: ['posts'],
    },
  ],
  labels: {
    singular: {
      en: 'Archive',
      ar: 'أرشيف',
    },
    plural: {
      en: 'Archives',
      ar: 'الأرشيف',
    },
  },
}
