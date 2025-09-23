import { revalidateDelete, revalidateHomePage } from '@/hooks/revalidateHomePage'
import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: {
      en: 'Service',
      ar: 'خدمة',
    },
    plural: {
      en: 'Services',
      ar: 'الخدمات',
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
        en: 'Service Title',
        ar: 'عنوان الخدمة',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Short Description',
        ar: 'وصف مختصر',
      },
    },
    {
      name: 'details',
      type: 'richText',
      localized: true,
      label: {
        en: 'Detailed Description',
        ar: 'وصف مفصل',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: {
        en: 'Service Icon',
        ar: 'أيقونة الخدمة',
      },
      options: [
        { label: 'Globe (🌐)', value: 'Globe' },
        { label: 'Shield (🛡️)', value: 'Shield' },
        { label: 'Server (🖥️)', value: 'Server' },
        { label: 'Smartphone (📱)', value: 'Smartphone' },
        { label: 'Cloud (☁️)', value: 'Cloud' },
        { label: 'BarChart3 (📊)', value: 'BarChart3' },
        { label: 'Layers (📚)', value: 'Layers' },
        { label: 'Users (👥)', value: 'Users' },
        { label: 'Headphones (🎧)', value: 'Headphones' },
        { label: 'Target (🎯)', value: 'Target' },
        { label: 'Lightbulb (💡)', value: 'Lightbulb' },
        { label: 'Clock (🕐)', value: 'Clock' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      label: {
        en: 'Service Features',
        ar: 'مميزات الخدمة',
      },
      fields: [
        {
          name: 'feature',
          type: 'text',
          localized: true,
          label: {
            en: 'Feature',
            ar: 'الميزة',
          },
        },
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
          en: 'Uncheck to hide this service from the website',
          ar: 'ألغ التحديد لإخفاء هذه الخدمة من الموقع',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Service Image',
        ar: 'صورة الخدمة',
      },
      admin: {
        description: {
          en: 'Optional image for the service',
          ar: 'صورة اختيارية للخدمة',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHomePage],
    afterDelete: [revalidateDelete],
  },
}
