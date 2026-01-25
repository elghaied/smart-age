import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const ApplicationFormBlock: Block = {
  slug: 'applicationForm',
  interfaceName: 'ApplicationFormBlock',
  fields: [
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: {
        en: 'Enable Intro Content',
        ar: 'تفعيل المحتوى التمهيدي',
      },
      defaultValue: true,
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
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
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
      name: 'successMessage',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: {
        en: 'Success Message',
        ar: 'رسالة النجاح',
      },
      localized: true,
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit Application',
      label: {
        en: 'Submit Button Label',
        ar: 'نص زر الإرسال',
      },
      localized: true,
    },
    {
      name: 'requireRecaptcha',
      type: 'checkbox',
      label: {
        en: 'Require reCAPTCHA',
        ar: 'طلب التحقق من reCAPTCHA',
      },
      defaultValue: true,
    },
    {
      name: 'maxFileSizeMB',
      type: 'number',
      label: {
        en: 'Max File Size (MB)',
        ar: 'الحد الأقصى لحجم الملف (ميجابايت)',
      },
      defaultValue: 10,
      min: 1,
      max: 50,
    },
  ],
  graphQL: {
    singularName: 'ApplicationFormBlock',
  },
  labels: {
    plural: {
      en: 'Application Form Blocks',
      ar: 'كتل نموذج التقديم',
    },
    singular: {
      en: 'Application Form Block',
      ar: 'كتلة نموذج التقديم',
    },
  },
}
