import { slugField, type CollectionConfig } from 'payload'

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Banner } from '../../blocks/Banner/config'
import { Code } from '../../blocks/Code/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { ApplicationFormBlock } from '../../blocks/ApplicationForm/config'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidateCareer'
import { transliterate } from 'transliteration'
import slugify from 'slugify'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

// Simplified Lexical editor for requirement fields
const simpleRichTextEditor = lexicalEditor({
  features: ({ rootFeatures }) => {
    return [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
    ]
  },
})

export const Careers: CollectionConfig<'careers'> = {
  slug: 'careers',
  labels: {
    singular: {
      en: 'Career',
      ar: 'وظيفة',
    },
    plural: {
      en: 'Careers',
      ar: 'وظائف',
    },
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    jobType: true,
    workMode: true,
    location: true,
    isActive: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    group: {
      en: 'Careers',
      ar: 'الوظائف',
    },
    defaultColumns: ['title', 'jobType', 'location', 'isActive', 'updatedAt'],
    livePreview: {
      url: ({ data, req, locale }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'careers',
          locale: locale.code,
          req,
        })

        return path
      },
    },
    preview: (data, { req, locale }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'careers',
        locale,
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Job Title',
        ar: 'المسمى الوظيفي',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Job Details',
            ar: 'تفاصيل الوظيفة',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'jobType',
                  type: 'select',
                  required: true,
                  label: {
                    en: 'Job Type',
                    ar: 'نوع الوظيفة',
                  },
                  options: [
                    { label: { en: 'Full Time', ar: 'دوام كامل' }, value: 'full_time' },
                    { label: { en: 'Part Time', ar: 'دوام جزئي' }, value: 'part_time' },
                    { label: { en: 'Contract', ar: 'عقد' }, value: 'contract' },
                    { label: { en: 'Internship', ar: 'تدريب' }, value: 'internship' },
                  ],
                  defaultValue: 'full_time',
                },
                {
                  name: 'workMode',
                  type: 'select',
                  required: true,
                  label: {
                    en: 'Work Mode',
                    ar: 'نمط العمل',
                  },
                  options: [
                    { label: { en: 'On Site', ar: 'في الموقع' }, value: 'on_site' },
                    { label: { en: 'Remote', ar: 'عن بعد' }, value: 'remote' },
                    { label: { en: 'Hybrid', ar: 'هجين' }, value: 'hybrid' },
                  ],
                  defaultValue: 'on_site',
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  required: true,
                  localized: true,
                  label: {
                    en: 'Location',
                    ar: 'الموقع',
                  },
                },
                {
                  name: 'department',
                  type: 'text',
                  localized: true,
                  label: {
                    en: 'Department',
                    ar: 'القسم',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'experienceLevel',
                  type: 'select',
                  required: true,
                  label: {
                    en: 'Experience Level',
                    ar: 'مستوى الخبرة',
                  },
                  options: [
                    { label: { en: 'Entry Level', ar: 'مستوى مبتدئ' }, value: 'entry' },
                    { label: { en: 'Mid Level', ar: 'مستوى متوسط' }, value: 'mid' },
                    { label: { en: 'Senior Level', ar: 'مستوى كبير' }, value: 'senior' },
                    { label: { en: 'Lead', ar: 'قائد' }, value: 'lead' },
                    { label: { en: 'Executive', ar: 'تنفيذي' }, value: 'executive' },
                  ],
                  defaultValue: 'mid',
                },
                {
                  name: 'experienceYears',
                  type: 'text',
                  localized: true,
                  label: {
                    en: 'Experience Years',
                    ar: 'سنوات الخبرة',
                  },
                  admin: {
                    placeholder: {
                      en: 'e.g., 3-5 years',
                      ar: 'مثال: 3-5 سنوات',
                    },
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'salaryRange',
                  type: 'text',
                  localized: true,
                  label: {
                    en: 'Salary Range',
                    ar: 'نطاق الراتب',
                  },
                  admin: {
                    placeholder: {
                      en: 'e.g., $50,000 - $70,000',
                      ar: 'مثال: 50,000 - 70,000 ريال',
                    },
                  },
                },
                {
                  name: 'applicationDeadline',
                  type: 'date',
                  label: {
                    en: 'Application Deadline',
                    ar: 'آخر موعد للتقديم',
                  },
                  admin: {
                    date: {
                      pickerAppearance: 'dayOnly',
                    },
                  },
                },
              ],
            },
            {
              name: 'isActive',
              type: 'checkbox',
              defaultValue: true,
              label: {
                en: 'Active',
                ar: 'نشط',
              },
              admin: {
                description: {
                  en: 'When disabled, this job posting will not accept new applications',
                  ar: 'عند التعطيل، لن يقبل هذا الإعلان طلبات جديدة',
                },
              },
            },
          ],
        },
        {
          label: {
            en: 'Description',
            ar: 'الوصف',
          },
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              label: {
                en: 'Hero Image',
                ar: 'صورة الغلاف',
              },
            },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: {
                en: 'Job Description',
                ar: 'وصف الوظيفة',
              },
              localized: true,
              required: true,
            },
          ],
        },
        {
          label: {
            en: 'Requirements',
            ar: 'المتطلبات',
          },
          fields: [
            {
              name: 'responsibilities',
              type: 'richText',
              editor: simpleRichTextEditor,
              localized: true,
              label: {
                en: 'Responsibilities',
                ar: 'المسؤوليات',
              },
              admin: {
                description: {
                  en: 'Key responsibilities and duties for this role',
                  ar: 'المسؤوليات والواجبات الرئيسية لهذا الدور',
                },
              },
            },
            {
              name: 'qualifications',
              type: 'richText',
              editor: simpleRichTextEditor,
              localized: true,
              label: {
                en: 'Qualifications',
                ar: 'المؤهلات',
              },
              admin: {
                description: {
                  en: 'Required qualifications and skills',
                  ar: 'المؤهلات والمهارات المطلوبة',
                },
              },
            },
            {
              name: 'preferredQualifications',
              type: 'richText',
              editor: simpleRichTextEditor,
              localized: true,
              label: {
                en: 'Preferred Qualifications',
                ar: 'المؤهلات المفضلة',
              },
              admin: {
                description: {
                  en: 'Nice-to-have qualifications and skills',
                  ar: 'المؤهلات والمهارات المفضلة',
                },
              },
            },
            {
              name: 'benefits',
              type: 'richText',
              editor: simpleRichTextEditor,
              localized: true,
              label: {
                en: 'Benefits',
                ar: 'المزايا',
              },
              admin: {
                description: {
                  en: 'Benefits and perks offered with this position',
                  ar: 'المزايا والامتيازات المقدمة مع هذه الوظيفة',
                },
              },
            },
          ],
        },
        {
          label: {
            en: 'Application',
            ar: 'التقديم',
          },
          fields: [
            {
              name: 'applicationForm',
              type: 'blocks',
              blocks: [ApplicationFormBlock],
              localized: true,
              label: {
                en: 'Application Form',
                ar: 'نموذج التقديم',
              },
              admin: {
                description: {
                  en: 'Add a form block to enable job applications',
                  ar: 'أضف نموذجاً لتمكين التقديم على الوظيفة',
                },
              },
              maxRows: 1,
            },
          ],
        },
        {
          label: {
            en: 'Related',
            ar: 'ذات صلة',
          },
          fields: [
            {
              name: 'relatedCareers',
              type: 'relationship',
              label: {
                en: 'Related Careers',
                ar: 'وظائف ذات صلة',
              },
              admin: {
                position: 'sidebar',
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: 'careers',
            },
            {
              name: 'categories',
              type: 'relationship',
              label: {
                en: 'Categories',
                ar: 'التصنيفات',
              },
              admin: {
                position: 'sidebar',
              },
              hasMany: true,
              relationTo: 'categories',
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
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    slugField({
      localized: true,
      slugify: ({ valueToSlugify }) => {
        const transliterated = transliterate(valueToSlugify)
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
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
