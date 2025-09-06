import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const Banner: Block = {
  slug: 'banner',
  interfaceName: 'BannerBlock',
  labels: {
    singular: {
      en: 'Banner',
      ar: 'لافتة',
    },
    plural: {
      en: 'Banners',
      ar: 'اللافتات',
    },
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      defaultValue: 'info',
      label: {
        en: 'Banner Style',
        ar: 'نمط اللافتة',
      },
      options: [
        { 
          label: {
            en: 'Info',
            ar: 'معلومات',
          }, 
          value: 'info' 
        },
        { 
          label: {
            en: 'Warning',
            ar: 'تحذير',
          }, 
          value: 'warning' 
        },
        { 
          label: {
            en: 'Error',
            ar: 'خطأ',
          }, 
          value: 'error' 
        },
        { 
          label: {
            en: 'Success',
            ar: 'نجاح',
          }, 
          value: 'success' 
        },
      ],
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: {
        en: 'Banner Content',
        ar: 'محتوى اللافتة',
      },
      localized: true,
      required: true,
    },
  ],
}
