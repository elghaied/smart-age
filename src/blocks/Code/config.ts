import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  labels: {
    singular: {
      en: 'Code Block',
      ar: 'كتلة كود',
    },
    plural: {
      en: 'Code Blocks',
      ar: 'كتل الكود',
    },
  },
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      label: {
        en: 'Programming Language',
        ar: 'لغة البرمجة',
      },
      options: [
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        {
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'CSS',
          value: 'css',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: {
        en: 'Code',
        ar: 'الكود',
      },
      required: true,
    },
  ],
}
