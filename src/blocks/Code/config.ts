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
          label: 'JSX',
          value: 'jsx',
        },
        {
          label: 'TSX',
          value: 'tsx',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'SCSS',
          value: 'scss',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'JSON',
          value: 'json',
        },
        {
          label: 'Python',
          value: 'python',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'C#',
          value: 'csharp',
        },
        {
          label: 'PHP',
          value: 'php',
        },
        {
          label: 'SQL',
          value: 'sql',
        },
        {
          label: 'Bash',
          value: 'bash',
        },
        {
          label: 'YAML',
          value: 'yaml',
        },
        {
          label: 'Markdown',
          value: 'markdown',
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
