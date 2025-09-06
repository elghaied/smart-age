import type { GlobalConfig } from 'payload'
import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: {
    en: 'Site Settings',
    ar: 'إعدادات الموقع',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: {
      en: 'Settings',
      ar: 'الإعدادات',
    },
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'siteUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'defaultLocale',
      type: 'select',
      required: true,
      options: [
        { label: 'العربية', value: 'ar' },
        { label: 'English', value: 'en' },
      ],
      defaultValue: 'ar',
    },
    {
      name: 'supportedLocales',
      type: 'array',
      required: true,
      label: {
        en: 'Supported Languages',
        ar: 'اللغات المدعومة',
      },
      fields: [
        {
          name: 'locale',
          type: 'select',
          options: [
            { label: 'العربية', value: 'ar' },
            { label: 'English', value: 'en' },
          ],
        },
      ],
    },
    // Logo and Branding
    {
      name: 'branding',
      type: 'group',
      label: {
        en: 'Branding',
        ar: 'الهوية التجارية',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Logo',
            ar: 'الشعار',
          },
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Favicon',
            ar: 'أيقونة الموقع',
          },
        },
        {
          name: 'primaryColor',
          type: 'text',
          label: {
            en: 'Primary Color',
            ar: 'اللون الأساسي',
          },
          admin: {
            description: {
              en: 'Primary brand color (hex code)',
              ar: 'اللون الأساسي للعلامة التجارية (رمز سادس عشري)',
            },
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          label: {
            en: 'Secondary Color',
            ar: 'اللون الثانوي',
          },
          admin: {
            description: {
              en: 'Secondary brand color (hex code)',
              ar: 'اللون الثانوي للعلامة التجارية (رمز سادس عشري)',
            },
          },
        },
      ],
    },
    // Default SEO
    {
      name: 'defaultSEO',
      type: 'group',
      label: {
        en: 'Default SEO Settings',
        ar: 'إعدادات تحسين محركات البحث الافتراضية',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'keywords',
          type: 'text',
          localized: true,
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Default Open Graph Image',
            ar: 'صورة الشبكة المفتوحة الافتراضية',
          },
        },
      ],
    },
    // Analytics and Tracking
    {
      name: 'analytics',
      type: 'group',
      label: {
        en: 'Analytics & Tracking',
        ar: 'التحليلات والتتبع',
      },
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
          label: {
            en: 'Google Analytics ID',
            ar: 'معرف جوجل أناليتكس',
          },
        },
        {
          name: 'facebookPixelId',
          type: 'text',
          label: {
            en: 'Facebook Pixel ID',
            ar: 'معرف فيسبوك بيكسل',
          },
        },
        {
          name: 'gtmId',
          type: 'text',
          label: {
            en: 'Google Tag Manager ID',
            ar: 'معرف مدير علامات جوجل',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
