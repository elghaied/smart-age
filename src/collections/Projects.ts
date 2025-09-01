import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'year', 'status', 'isActive'],
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
        en: 'Project Name',
        ar: 'اسم المشروع'
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      label: {
        en: 'Project Description',
        ar: 'وصف المشروع'
      },
    },
    {
      name: 'year',
      type: 'text',
      required: true,
      label: {
        en: 'Year',
        ar: 'السنة'
      },
    },
    {
      name: 'yearTitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Year Section Title',
        ar: 'عنوان قسم السنة'
      },
      admin: {
        description: {
          en: 'Title for the year section (e.g., "Strong Beginning")',
          ar: 'عنوان لقسم السنة (مثل "بداية قوية")'
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: {
        en: 'Project Status',
        ar: 'حالة المشروع'
      },
      options: [
        { 
          label: {
            en: 'Completed',
            ar: 'مكتمل'
          }, 
          value: 'completed' 
        },
        { 
          label: {
            en: 'In Development',
            ar: 'قيد التطوير'
          }, 
          value: 'in_development' 
        },
        { 
          label: {
            en: 'Planning',
            ar: 'في مرحلة التخطيط'
          }, 
          value: 'planning' 
        },
      ],
    },
    {
      name: 'statusLabel',
      type: 'text',
      localized: true,
      label: {
        en: 'Custom Status Label',
        ar: 'تسمية حالة مخصصة'
      },
      admin: {
        description: {
          en: 'Override the default status label with custom text',
          ar: 'استبدال تسمية الحالة الافتراضية بنص مخصص'
        },
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      label: {
        en: 'Project Icon',
        ar: 'أيقونة المشروع'
      },
      options: [
        { label: 'Building (🏢)', value: 'Building' },
        { label: 'Shield (🛡️)', value: 'Shield' },
        { label: 'Server (🖥️)', value: 'Server' },
        { label: 'Smartphone (📱)', value: 'Smartphone' },
        { label: 'Globe (🌐)', value: 'Globe' },
        { label: 'Cloud (☁️)', value: 'Cloud' },
        { label: 'BarChart3 (📊)', value: 'BarChart3' },
        { label: 'Database (🗃️)', value: 'Database' },
        { label: 'Cpu (⚙️)', value: 'Cpu' },
        { label: 'Users (👥)', value: 'Users' },
        { label: 'Award (🏆)', value: 'Award' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: {
        en: 'Display Order',
        ar: 'ترتيب العرض'
      },
      admin: {
        description: {
          en: 'Lower numbers appear first in timeline',
          ar: 'الأرقام الأقل تظهر أولاً في الخط الزمني'
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: {
        en: 'Is Active',
        ar: 'نشط'
      },
      admin: {
        description: {
          en: 'Uncheck to hide this project from the timeline',
          ar: 'ألغ التحديد لإخفاء هذا المشروع من الخط الزمني'
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: {
        en: 'Project Image',
        ar: 'صورة المشروع'
      },
      admin: {
        description: {
          en: 'Optional image for the project',
          ar: 'صورة اختيارية للمشروع'
        },
      },
    },
  ],
}