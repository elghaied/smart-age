import type { GlobalConfig } from 'payload'
import { revalidateContactInfo } from './hooks/RevalidateContactInfo'
import { FormBlock } from '@/blocks/Form/config'

export const ContactInfo: GlobalConfig = {
  slug: 'contact-info',
  label: {
    en: 'Contact Information',
    ar: 'معلومات الاتصال',
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
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: {
          en: 'Internal label for this contact info',
          ar: 'تسمية داخلية لمعلومات الاتصال هذه',
        },
      },
    },
    // Contact Information
    {
      name: 'contactInfo',
      type: 'group',
      label: {
        en: 'Contact Information',
        ar: 'معلومات الاتصال',
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          label: {
            en: 'Address',
            ar: 'العنوان',
          },
          localized: true,
        },
        {
          name: 'mapLink',
          type: 'text',
          label: {
            en: 'Map Link (Google Maps URL)',
            ar: 'رابط الخريطة (رابط جوجل مابس)',
          },
        },
        {
          name: 'phone',
          type: 'text',
          label: {
            en: 'Phone Number',
            ar: 'رقم الهاتف',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: {
            en: 'Email Address',
            ar: 'البريد الإلكتروني',
          },
        },
        {
          name: 'workingHours',
          type: 'text',
          label: {
            en: 'Working Hours',
            ar: 'ساعات العمل',
          },
          localized: true,
        },
      ],
    },
    // Contact Form Configuration
    {
      name: 'contactForm',
      type: 'blocks',
      blocks: [FormBlock],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
    // Contact Info Labels
    {
      name: 'labels',
      type: 'group',
      label: {
        en: 'Contact Info Display Labels',
        ar: 'تسميات عرض معلومات الاتصال',
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          label: {
            en: 'Address Label',
            ar: 'تسمية العنوان',
          },
          localized: true,
        },

        {
          name: 'phone',
          type: 'text',
          label: {
            en: 'Phone Label',
            ar: 'تسمية الهاتف',
          },
          localized: true,
        },
        {
          name: 'email',
          type: 'text',
          label: {
            en: 'Email Label',
            ar: 'تسمية البريد الإلكتروني',
          },
          localized: true,
        },
        {
          name: 'hours',
          type: 'text',
          label: {
            en: 'Working Hours Label',
            ar: 'تسمية ساعات العمل',
          },
          localized: true,
        },
      ],
    },
    // Social Media
    {
      name: 'socialMedia',
      type: 'group',
      label: {
        en: 'Social Media',
        ar: 'وسائل التواصل الاجتماعي',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Social Media Section Title',
            ar: 'عنوان قسم وسائل التواصل الاجتماعي',
          },
          localized: true,
        },
        {
          name: 'facebook',
          type: 'text',
          label: {
            en: 'Facebook URL',
            ar: 'رابط فيسبوك',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: {
            en: 'Twitter URL',
            ar: 'رابط تويتر',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: {
            en: 'Instagram URL',
            ar: 'رابط إنستغرام',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: {
            en: 'LinkedIn URL',
            ar: 'رابط لينكد إن',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateContactInfo],
  },
}
