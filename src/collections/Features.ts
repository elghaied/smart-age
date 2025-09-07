import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  labels: {
    singular: {
      en: 'Feature',
      ar: 'ميزة',
    },
    plural: {
      en: 'Features',
      ar: 'المميزات',
    },
  },
  admin: {
    group: {
      en: 'Business',
      ar: 'الأعمال',
    },
    useAsTitle: 'title',
    defaultColumns: ['title', 'icon', 'order', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Feature Title',
        ar: 'عنوان الميزة',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Feature Description',
        ar: 'وصف الميزة',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: {
        en: 'Feature Icon',
        ar: 'أيقونة الميزة',
      },
      options: [
        { label: 'Globe (🌐)', value: 'Globe' },
        { label: 'Target (🎯)', value: 'Target' },
        { label: 'Lightbulb (💡)', value: 'Lightbulb' },
        { label: 'Clock (🕐)', value: 'Clock' },
        { label: 'Shield (🛡️)', value: 'Shield' },
        { label: 'Award (🏆)', value: 'Award' },
        { label: 'Users (👥)', value: 'Users' },
        { label: 'Zap (⚡)', value: 'Zap' },
        { label: 'CheckCircle (✅)', value: 'CheckCircle' },
        { label: 'Star (⭐)', value: 'Star' },
        { label: 'ThumbsUp (👍)', value: 'ThumbsUp' },
        { label: 'Rocket (🚀)', value: 'Rocket' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: {
        en: 'Display Order',
        ar: 'ترتيب العرض',
      },
      admin: {
        description: {
          en: 'Lower numbers appear first',
          ar: 'الأرقام الأقل تظهر أولاً',
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Is Active',
        ar: 'نشط',
      },
      admin: {
        description: {
          en: 'Uncheck to hide this feature from the website',
          ar: 'ألغ التحديد لإخفاء هذه الميزة من الموقع',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Feature Image',
        ar: 'صورة الميزة',
      },
      admin: {
        description: {
          en: 'Optional image to illustrate this feature',
          ar: 'صورة اختيارية لتوضيح هذه الميزة',
        },
      },
    },
    {
      name: 'link',
      type: 'group',
      label: {
        en: 'Optional Link',
        ar: 'رابط اختياري',
      },
      fields: [
        {
          name: 'url',
          type: 'text',
          label: {
            en: 'Link URL',
            ar: 'رابط URL',
          },
        },
        {
          name: 'text',
          type: 'text',
          localized: true,
          label: {
            en: 'Link Text',
            ar: 'نص الرابط',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
          label: {
            en: 'Open in New Tab',
            ar: 'فتح في تبويب جديد',
          },
        },
      ],
    },
  ],
}
