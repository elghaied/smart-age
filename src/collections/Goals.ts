import { revalidateGoal, revalidateGoalDelete } from '@/hooks/revalidateGoal'
import type { CollectionConfig } from 'payload'

export const Goals: CollectionConfig = {
  slug: 'goals',
  labels: {
    singular: {
      en: 'Goal',
      ar: 'هدف',
    },
    plural: {
      en: 'Goals',
      ar: 'الأهداف',
    },
  },
  admin: {
    group: {
      en: 'Business',
      ar: 'الأعمال',
    },
    useAsTitle: 'text',
    defaultColumns: ['text', 'icon', 'order', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Goal Text',
        ar: 'نص الهدف',
      },
    },
    {
      name: 'shortTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Short Title',
        ar: 'عنوان مختصر',
      },
      admin: {
        description: {
          en: 'Optional short title for display purposes',
          ar: 'عنوان مختصر اختياري لأغراض العرض',
        },
      },
    },
    {
      name: 'icon',
      type: 'select',
      label: {
        en: 'Goal Icon',
        ar: 'أيقونة الهدف',
      },
      options: [
        { label: 'Target (🎯)', value: 'Target' },
        { label: 'Shield (🛡️)', value: 'Shield' },
        { label: 'Server (🖥️)', value: 'Server' },
        { label: 'Globe (🌐)', value: 'Globe' },
        { label: 'Award (🏆)', value: 'Award' },
        { label: 'Zap (⚡)', value: 'Zap' },
        { label: 'TrendingUp (📈)', value: 'TrendingUp' },
        { label: 'Users (👥)', value: 'Users' },
        { label: 'Lightbulb (💡)', value: 'Lightbulb' },
        { label: 'Heart (❤️)', value: 'Heart' },
        { label: 'CheckCircle (✅)', value: 'CheckCircle' },
        { label: 'Flag (🏳️)', value: 'Flag' },
      ],
    },
    {
      name: 'category',
      type: 'select',
      label: {
        en: 'Goal Category',
        ar: 'فئة الهدف',
      },
      options: [
        {
          label: {
            en: 'Strategic',
            ar: 'استراتيجي',
          },
          value: 'strategic',
        },
        {
          label: {
            en: 'Operational',
            ar: 'تشغيلي',
          },
          value: 'operational',
        },
        {
          label: {
            en: 'Customer-focused',
            ar: 'يركز على العملاء',
          },
          value: 'customer_focused',
        },
        {
          label: {
            en: 'Innovation',
            ar: 'ابتكار',
          },
          value: 'innovation',
        },
        {
          label: {
            en: 'Growth',
            ar: 'نمو',
          },
          value: 'growth',
        },
        {
          label: {
            en: 'Quality',
            ar: 'جودة',
          },
          value: 'quality',
        },
      ],
    },
    {
      name: 'timeline',
      type: 'select',
      label: {
        en: 'Timeline',
        ar: 'الإطار الزمني',
      },
      options: [
        {
          label: {
            en: 'Short-term (1 year)',
            ar: 'قصير المدى (سنة واحدة)',
          },
          value: 'short_term',
        },
        {
          label: {
            en: 'Medium-term (2-3 years)',
            ar: 'متوسط المدى (٢-٣ سنوات)',
          },
          value: 'medium_term',
        },
        {
          label: {
            en: 'Long-term (5+ years)',
            ar: 'طويل المدى (٥+ سنوات)',
          },
          value: 'long_term',
        },
        {
          label: {
            en: 'Ongoing',
            ar: 'مستمر',
          },
          value: 'ongoing',
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
          en: 'Uncheck to hide this goal from the website',
          ar: 'ألغ التحديد لإخفاء هذا الهدف من الموقع',
        },
      },
    },
    {
      name: 'progress',
      type: 'number',
      label: {
        en: 'Progress Percentage',
        ar: 'نسبة التقدم',
      },
      admin: {
        description: {
          en: 'Optional progress indicator (0-100)',
          ar: 'مؤشر تقدم اختياري (٠-١٠٠)',
        },
      },
      min: 0,
      max: 100,
    },
  ],
  hooks: {
    afterChange: [revalidateGoal],
    afterDelete: [revalidateGoalDelete],
  },
}
