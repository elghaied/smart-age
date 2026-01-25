import type { Block } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const TestimonialFormBlock: Block = {
  slug: 'testimonialForm',
  interfaceName: 'TestimonialFormBlock',
  fields: [
    {
      name: 'enableIntro',
      type: 'checkbox',
      label: 'Enable Intro Content',
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
      label: 'Intro Content',
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
      label: 'Success Message',
      localized: true,
    },
    {
      name: 'submitButtonLabel',
      type: 'text',
      defaultValue: 'Submit Testimonial',
      localized: true,
    },
    {
      name: 'requireRecaptcha',
      type: 'checkbox',
      label: 'Require reCAPTCHA',
      defaultValue: true,
    },
  ],
  graphQL: {
    singularName: 'TestimonialFormBlock',
  },
  labels: {
    plural: 'Testimonial Form Blocks',
    singular: 'Testimonial Form Block',
  },
}
