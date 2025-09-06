import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const FormBlock: Block = {
  slug: 'formBlock',
  interfaceName: 'FormBlock',
  fields: [
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      label: {
        en: 'Form',
        ar: 'النموذج',
      },
      required: true,
    },
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: {
        en: 'Enable Intro Content',
        ar: 'تفعيل المحتوى التمهيدي',
      },
    },
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
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
  ],
  graphQL: {
    singularName: 'FormBlock',
  },
  labels: {
    singular: {
      en: 'Form Block',
      ar: 'كتلة نموذج',
    },
    plural: {
      en: 'Form Blocks',
      ar: 'كتل النماذج',
    },
  },
}
