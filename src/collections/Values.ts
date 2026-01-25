import { revalidateValue, revalidateValueDelete } from '@/hooks/revalidateValue'
import type { CollectionConfig } from 'payload'

export const Values: CollectionConfig = {
  slug: 'values',
  labels: {
    singular: {
      en: 'Value',
      ar: 'قيمة',
    },
    plural: {
      en: 'Values',
      ar: 'القيم',
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
        en: 'Value Title',
        ar: 'عنوان القيمة',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Value Description',
        ar: 'وصف القيمة',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: {
        en: 'Value Icon',
        ar: 'أيقونة القيمة',
      },
      options: [
        { label: 'Lightbulb (💡)', value: 'Lightbulb' },
        { label: 'Heart (❤️)', value: 'Heart' },
        { label: 'Award (🏆)', value: 'Award' },
        { label: 'Zap (⚡)', value: 'Zap' },
        { label: 'Target (🎯)', value: 'Target' },
        { label: 'Shield (🛡️)', value: 'Shield' },
        { label: 'Users (👥)', value: 'Users' },
        { label: 'Globe (🌐)', value: 'Globe' },
        { label: 'Star (⭐)', value: 'Star' },
        { label: 'CheckCircle (✅)', value: 'CheckCircle' },
        { label: 'Handshake (🤝)', value: 'Handshake' },
        { label: 'Eye (👁️)', value: 'Eye' },
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
          en: 'Uncheck to hide this value from the website',
          ar: 'ألغ التحديد لإخفاء هذه القيمة من الموقع',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Value Image',
        ar: 'صورة القيمة',
      },
      admin: {
        description: {
          en: 'Optional image to represent this value',
          ar: 'صورة اختيارية لتمثيل هذه القيمة',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateValue],
    afterDelete: [revalidateValueDelete],
  },
}
