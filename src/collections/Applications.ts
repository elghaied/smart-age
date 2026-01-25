import { authenticated } from '@/access/authenticated'
import { anyone } from '@/access/anyone'
import { CollectionConfig } from 'payload'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: {
      en: 'Application',
      ar: 'طلب',
    },
    plural: {
      en: 'Applications',
      ar: 'الطلبات',
    },
  },
  admin: {
    useAsTitle: 'applicantName',
    defaultColumns: ['applicantName', 'positionApplied', 'createdAt'],
    group: {
      en: 'Careers',
      ar: 'الوظائف',
    },
  },
  access: {
    create: anyone, // Allow public form submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  fields: [
    {
      name: 'applicantName',
      type: 'text',
      required: true,
      label: {
        en: 'Applicant Name',
        ar: 'اسم المتقدم',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: {
        en: 'Email Address',
        ar: 'عنوان البريد الإلكتروني',
      },
    },
    {
      name: 'cv',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: {
        en: 'Curriculum Vitae (CV)',
        ar: 'السيرة الذاتية',
      },
    },
    {
      name: 'positionApplied',
      type: 'text',
      required: true,
      label: {
        en: 'Position Applied For',
        ar: 'المنصب المتقدم له',
      },
    },
  ],
}
