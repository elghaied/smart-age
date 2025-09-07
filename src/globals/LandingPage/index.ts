import type { GlobalConfig } from 'payload'
import { revalidateHomepage } from './hooks/RevalidateHomePage'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: {
    en: 'Homepage',
    ar: 'الصفحة الرئيسية',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: 'Content',
      ar: 'المحتوى',
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Content',
            ar: 'المحتوى',
          },
          fields: [
            // Hero Section
            {
              name: 'hero',
              type: 'group',
              label: {
                en: 'Hero Section',
                ar: 'قسم البطل',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
                {
                  name: 'features',
                  type: 'array',
                  label: {
                    en: 'Hero Features',
                    ar: 'مميزات البطل',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'primaryCTA',
                  type: 'group',
                  label: {
                    en: 'Primary Call to Action',
                    ar: 'الدعوة الأساسية للعمل',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'secondaryCTA',
                  type: 'group',
                  label: {
                    en: 'Secondary Call to Action',
                    ar: 'الدعوة الثانوية للعمل',
                  },
                  fields: [
                    {
                      name: 'text',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'link',
                      type: 'text',
                    },
                  ],
                },
                {
                  name: 'established',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'location',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'backgroundImage',
                  type: 'upload',
                  relationTo: 'media',
                },
              ],
            },
            // About Section
            {
              name: 'about',
              type: 'group',
              label: {
                en: 'About Section',
                ar: 'قسم من نحن',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'richText',
                  localized: true,
                },
                {
                  name: 'mission',
                  type: 'group',
                  label: {
                    en: 'Mission',
                    ar: 'المهمة',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    {
                      name: 'text',
                      type: 'richText',
                      localized: true,
                    },
                  ],
                },
                {
                  name: 'valuesTitle',
                  type: 'text',
                  label: {
                    en: 'Values Section Title',
                    ar: 'عنوان قسم القيم',
                  },
                  localized: true,
                },
              ],
            },
            // Why Us Section
            {
              name: 'whyUs',
              type: 'group',
              label: {
                en: 'Why Choose Us Section',
                ar: 'قسم لماذا نحن',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            // Goals Section
            {
              name: 'goals',
              type: 'group',
              label: {
                en: 'Goals Section',
                ar: 'قسم الأهداف',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
              ],
            },
            // Projects Section
            {
              name: 'projects',
              type: 'group',
              label: {
                en: 'Projects Section',
                ar: 'قسم المشاريع',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            // Services Section
            {
              name: 'services',
              type: 'group',
              label: {
                en: 'Services Section',
                ar: 'قسم الخدمات',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
            // Contact Section
            {
              name: 'contact',
              type: 'group',
              label: {
                en: 'Contact Section',
                ar: 'قسم التواصل',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
