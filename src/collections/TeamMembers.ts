import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  labels: {
    singular: {
      en: 'Team Member',
      ar: 'عضو الفريق',
    },
    plural: {
      en: 'Team Members',
      ar: 'أعضاء الفريق',
    },
  },
  admin: {
    group: {
      en: 'Business',
      ar: 'الأعمال',
    },
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'order', 'isActive'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Full Name',
        ar: 'الاسم الكامل',
      },
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Job Title/Role',
        ar: 'المسمى الوظيفي/الدور',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Description',
        ar: 'الوصف',
      },
      admin: {
        description: {
          en: 'Brief description about the team member',
          ar: 'وصف مختصر عن عضو الفريق',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',

      label: {
        en: 'Profile Image',
        ar: 'صورة الملف الشخصي',
      },
      admin: {
        description: {
          en: 'Professional photo of the team member',
          ar: 'صورة مهنية لعضو الفريق',
        },
      },
    },
    {
      name: 'specialties',
      type: 'array',
      required: true,
      label: {
        en: 'Specialties',
        ar: 'التخصصات',
      },
      admin: {
        description: {
          en: 'Areas of expertise and skills',
          ar: 'مجالات الخبرة والمهارات',
        },
      },
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Specialty',
            ar: 'التخصص',
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
          en: 'Uncheck to hide this team member from the website',
          ar: 'ألغ التحديد لإخفاء عضو الفريق هذا من الموقع',
        },
      },
    },
  ],
}
