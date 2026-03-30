import type { GlobalConfig } from 'payload'
import { revalidateHomepage } from './hooks/RevalidateHomePage'

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
                {
                  name: 'aboutUsCallToAction',
                  type: 'group',
                  label: {
                    en: 'About Us Call to Action',
                    ar: 'الدعوة إلى العمل حولنا',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Title',
                        ar: 'عنوان CTA',
                      },
                    },
                    {
                      name: 'description',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Description',
                        ar: 'وصف CTA',
                      },
                    },
                    {
                      name: 'strongPoints',
                      type: 'array',
                      label: {
                        en: 'Strong Points',
                        ar: 'نقاط القوة',
                      },
                      fields: [
                        {
                          name: 'point',
                          type: 'text',
                          localized: true,
                        },
                      ],
                    },
                  ],
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
                {
                  name: 'servicesCallToAction',
                  type: 'group',
                  label: {
                    en: 'Services Call to Action',
                    ar: 'الدعوة إلى العمل للخدمات',
                  },
                  fields: [
                    {
                      name: 'miniTitle',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Mini Title',
                        ar: 'عنوان صغير',
                      },
                    },
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Title',

                        ar: 'عنوان CTA',
                      },
                    },
                    {
                      name: 'description',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Description',
                        ar: 'وصف CTA',
                      },
                    },
                    {
                      name: 'buttonText',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Button Text',
                        ar: 'نص الزر',
                      },
                    },
                    {
                      name: 'buttonLink',
                      type: 'text',
                      label: {
                        en: 'Button Link',
                        ar: 'رابط الزر',
                      },
                    },
                  ],
                },
              ],
            },
            // Team Section
            {
              name: 'team',
              type: 'group',
              label: {
                en: 'Team Section',
                ar: 'قسم الفريق',
              },
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                  label: {
                    en: 'Section Title',
                    ar: 'عنوان القسم',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  localized: true,
                  label: {
                    en: 'Section Subtitle',
                    ar: 'العنوان الفرعي للقسم',
                  },
                },
                {
                  name: 'description',
                  type: 'textarea',
                  localized: true,
                  label: {
                    en: 'Section Description',
                    ar: 'وصف القسم',
                  },
                },
                {
                  name: 'stats',
                  type: 'group',
                  label: {
                    en: 'Team Statistics',
                    ar: 'إحصائيات الفريق',
                  },
                  fields: [
                    {
                      name: 'expertsCount',
                      type: 'text',
                      label: {
                        en: 'Number of Experts',
                        ar: 'عدد الخبراء',
                      },
                      admin: {
                        description: {
                          en: 'Total number of experts in the team',
                          ar: 'العدد الإجمالي للخبراء في الفريق',
                        },
                      },
                    },
                    {
                      name: 'experienceYears',
                      type: 'text',
                      label: {
                        en: 'Years of Experience',
                        ar: 'سنوات الخبرة',
                      },
                      admin: {
                        description: {
                          en: 'Combined years of experience',
                          ar: 'سنوات الخبرة المجمعة',
                        },
                      },
                    },
                    {
                      name: 'certificationsCount',
                      type: 'text',
                      label: {
                        en: 'Number of Certifications',
                        ar: 'عدد الشهادات',
                      },
                      admin: {
                        description: {
                          en: 'Total certifications held by team members',
                          ar: 'إجمالي الشهادات التي يحملها أعضاء الفريق',
                        },
                      },
                    },
                    {
                      name: 'supportAvailability',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Support Availability',
                        ar: 'توفر الدعم',
                      },
                      admin: {
                        description: {
                          en: 'Support availability hours (e.g., "24/7", "Business Hours")',
                          ar: 'ساعات توفر الدعم (مثل "24/7"، "ساعات العمل")',
                        },
                      },
                    },
                  ],
                },
                {
                  name: 'teamCallToAction',
                  type: 'group',
                  label: {
                    en: 'Team Call to Action',
                    ar: 'الدعوة إلى العمل للفريق',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Title',
                        ar: 'عنوان CTA',
                      },
                    },
                    {
                      name: 'description',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'CTA Description',
                        ar: 'وصف CTA',
                      },
                    },
                    {
                      name: 'viewPositionsButtonText',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'View Open Positions Button Text',
                        ar: 'عرض نص زر الوظائف المفتوحة',
                      },
                    },
                    {
                      name: 'joinUsButtonText',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Join Us Button Text',
                        ar: 'انضم إلينا نص الزر',
                      },
                    },
                  ],
                },
              ],
            },
            // Partners Section
            {
              name: 'partners',
              type: 'group',
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  localized: true,
                },
                {
                  name: 'items',
                  type: 'array',
                  fields: [
                    {
                      name: 'name',
                      type: 'text',
                    },
                    {
                      name: 'logo',
                      type: 'upload',
                      relationTo: 'media',
                    },
                  ],
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
                {
                  name: 'contactCallToAction',
                  type: 'group',
                  label: {
                    en: 'Contact Call to Action',
                    ar: 'الدعوة إلى العمل للتواصل',
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      localized: true,
                    },
                    { name: 'description', type: 'text', localized: true },
                    {
                      name: 'callUsButtonText',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Call Us Button Text',
                        ar: 'اتصل بنا نص الزر',
                      },
                    },
                    {
                      name: 'emailUsButtonText',
                      type: 'text',
                      localized: true,
                      label: {
                        en: 'Email Us Button Text',
                        ar: 'راسلنا نص الزر',
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
