import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    label: {
      en: 'Column Size',
      ar: 'حجم العمود',
    },
    options: [
      {
        label: {
          en: 'One Third',
          ar: 'ثلث',
        },
        value: 'oneThird',
      },
      {
        label: {
          en: 'Half',
          ar: 'نصف',
        },
        value: 'half',
      },
      {
        label: {
          en: 'Two Thirds',
          ar: 'ثلثان',
        },
        value: 'twoThirds',
      },
      {
        label: {
          en: 'Full',
          ar: 'كامل',
        },
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: {
      en: 'Content',
      ar: 'المحتوى',
    },
    localized: true,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
    label: {
      en: 'Enable Link',
      ar: 'تفعيل الرابط',
    },
  },
  link({
    overrides: {
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableLink)
        },
      },
    },
  }),
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  labels: {
    singular: {
      en: 'Content',
      ar: 'محتوى',
    },
    plural: {
      en: 'Content Blocks',
      ar: 'كتل المحتوى',
    },
  },
  fields: [
    {
      name: 'columns',
      type: 'array',
      label: {
        en: 'Columns',
        ar: 'الأعمدة',
      },
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
