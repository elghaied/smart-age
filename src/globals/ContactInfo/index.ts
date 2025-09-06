import type { GlobalConfig } from 'payload'

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
          ar: 'تسمية داخلية لمعلومات الاتصال هذه'
        },
      },
    },
    // Contact Information
    {
      name: 'contactInfo',
      type: 'group',
      label: {
        en: 'Contact Information',
        ar: 'معلومات الاتصال'
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          label: {
            en: 'Address',
            ar: 'العنوان'
          },
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: {
            en: 'Phone Number',
            ar: 'رقم الهاتف'
          },
        },
        {
          name: 'email',
          type: 'email',
          label: {
            en: 'Email Address',
            ar: 'البريد الإلكتروني'
          },
        },
        {
          name: 'workingHours',
          type: 'text',
          label: {
            en: 'Working Hours',
            ar: 'ساعات العمل'
          },
          localized: true,
        },
      ],
    },
    // Contact Form Configuration
    {
      name: 'contactForm',
      type: 'group',
      label: {
        en: 'Contact Form',
        ar: 'نموذج الاتصال'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Form Title',
            ar: 'عنوان النموذج'
          },
          localized: true,
        },
        {
          name: 'fields',
          type: 'group',
          label: {
            en: 'Form Fields Labels',
            ar: 'تسميات حقول النموذج'
          },
          fields: [
            {
              name: 'nameLabel',
              type: 'text',
              label: {
                en: 'Name Field Label',
                ar: 'تسمية حقل الاسم'
              },
              localized: true,
            },
            {
              name: 'namePlaceholder',
              type: 'text',
              label: {
                en: 'Name Field Placeholder',
                ar: 'نص توضيحي لحقل الاسم'
              },
              localized: true,
            },
            {
              name: 'emailLabel',
              type: 'text',
              label: {
                en: 'Email Field Label',
                ar: 'تسمية حقل البريد الإلكتروني'
              },
              localized: true,
            },
            {
              name: 'emailPlaceholder',
              type: 'text',
              label: {
                en: 'Email Field Placeholder',
                ar: 'نص توضيحي لحقل البريد الإلكتروني'
              },
              localized: true,
            },
            {
              name: 'subjectLabel',
              type: 'text',
              label: {
                en: 'Subject Field Label',
                ar: 'تسمية حقل الموضوع'
              },
              localized: true,
            },
            {
              name: 'subjectPlaceholder',
              type: 'text',
              label: {
                en: 'Subject Field Placeholder',
                ar: 'نص توضيحي لحقل الموضوع'
              },
              localized: true,
            },
            {
              name: 'messageLabel',
              type: 'text',
              label: {
                en: 'Message Field Label',
                ar: 'تسمية حقل الرسالة'
              },
              localized: true,
            },
            {
              name: 'messagePlaceholder',
              type: 'text',
              label: {
                en: 'Message Field Placeholder',
                ar: 'نص توضيحي لحقل الرسالة'
              },
              localized: true,
            },
            {
              name: 'submitButton',
              type: 'text',
              label: {
                en: 'Submit Button Text',
                ar: 'نص زر الإرسال'
              },
              localized: true,
            },
          ],
        },
      ],
    },
    // Contact Info Labels
    {
      name: 'labels',
      type: 'group',
      label: {
        en: 'Contact Info Display Labels',
        ar: 'تسميات عرض معلومات الاتصال'
      },
      fields: [
        {
          name: 'address',
          type: 'text',
          label: {
            en: 'Address Label',
            ar: 'تسمية العنوان'
          },
          localized: true,
        },
        {
          name: 'phone',
          type: 'text',
          label: {
            en: 'Phone Label',
            ar: 'تسمية الهاتف'
          },
          localized: true,
        },
        {
          name: 'email',
          type: 'text',
          label: {
            en: 'Email Label',
            ar: 'تسمية البريد الإلكتروني'
          },
          localized: true,
        },
        {
          name: 'hours',
          type: 'text',
          label: {
            en: 'Working Hours Label',
            ar: 'تسمية ساعات العمل'
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
        ar: 'وسائل التواصل الاجتماعي'
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: {
            en: 'Social Media Section Title',
            ar: 'عنوان قسم وسائل التواصل الاجتماعي'
          },
          localized: true,
        },
        {
          name: 'facebook',
          type: 'text',
          label: {
            en: 'Facebook URL',
            ar: 'رابط فيسبوك'
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: {
            en: 'Twitter URL',
            ar: 'رابط تويتر'
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: {
            en: 'Instagram URL',
            ar: 'رابط إنستغرام'
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: {
            en: 'LinkedIn URL',
            ar: 'رابط لينكد إن'
          },
        },
      ],
    },
  ],
}