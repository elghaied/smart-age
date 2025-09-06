import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  labels: {
    singular: {
      en: 'Media Block',
      ar: 'كتلة وسائط',
    },
    plural: {
      en: 'Media Blocks',
      ar: 'كتل الوسائط',
    },
  },
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Media',
        ar: 'الوسائط',
      },
      required: true,
    },
  ],
}
