import { slugField, type CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

import { transliterate } from 'transliteration'
import slugify from 'slugify'
export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Category',
      ar: 'فئة',
    },
    plural: {
      en: 'Categories',
      ar: 'الفئات',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: {
      en: 'Content',
      ar: 'المحتوى',
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({
      localized: true,
      slugify: ({ valueToSlugify }) => {
        // First transliterate Arabic to Latin
        const transliterated = transliterate(valueToSlugify)

        // Then apply custom slugify rules
        return slugify(transliterated, {
          lower: true,
          strict: true,
          locale: 'en',
          trim: true,
          remove: /[*+~.()'"!:@]/g,
        })
      },
    }),
  ],
}
