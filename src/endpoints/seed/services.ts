import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Service 1: Cybersecurity
export const service1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Cybersecurity Solutions',
        ar: 'حلول الأمن السيبراني',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Comprehensive cybersecurity services to protect your business from evolving digital threats and ensure data integrity.',
        ar: 'خدمات أمن سيبراني شاملة لحماية أعمالك من التهديدات الرقمية المتطورة وضمان سلامة البيانات.',
      },
      locale,
    ),
    icon: 'Shield',
    features: [
      {
        feature: translate(
          {
            en: 'Penetration Testing',
            ar: 'اختبار الاختراق',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Security Audits',
            ar: 'تدقيق أمني',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Incident Response',
            ar: 'الاستجابة للحوادث',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Security Training',
            ar: 'التدريب الأمني',
          },
          locale,
        ),
      },
    ],
    order: 1,
    isActive: true,
  }
}

// Service 2: Web Development
export const service2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Web Development',
        ar: 'تطوير المواقع',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Custom web applications and websites built with modern technologies to help your business thrive online.',
        ar: 'تطبيقات ومواقع ويب مخصصة مبنية بأحدث التقنيات لمساعدة أعمالك على الازدهار عبر الإنترنت.',
      },
      locale,
    ),
    icon: 'Globe',
    features: [
      {
        feature: translate(
          {
            en: 'Responsive Design',
            ar: 'تصميم متجاوب',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'E-commerce Solutions',
            ar: 'حلول التجارة الإلكترونية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Content Management Systems',
            ar: 'أنظمة إدارة المحتوى',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'API Development',
            ar: 'تطوير واجهات البرمجة',
          },
          locale,
        ),
      },
    ],
    order: 2,
    isActive: true,
  }
}

// Service 3: Mobile Development
export const service3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Mobile App Development',
        ar: 'تطوير تطبيقات الجوال',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
        ar: 'تطبيقات جوال أصلية ومتعددة المنصات تقدم تجارب مستخدم استثنائية على iOS و Android.',
      },
      locale,
    ),
    icon: 'Smartphone',
    features: [
      {
        feature: translate(
          {
            en: 'iOS Development',
            ar: 'تطوير iOS',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Android Development',
            ar: 'تطوير Android',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Cross-Platform Apps',
            ar: 'تطبيقات متعددة المنصات',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'App Maintenance',
            ar: 'صيانة التطبيقات',
          },
          locale,
        ),
      },
    ],
    order: 3,
    isActive: true,
  }
}

// Service 4: Networking
export const service4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Network Infrastructure',
        ar: 'البنية التحتية للشبكات',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Design, implementation, and management of robust network infrastructure for businesses of all sizes.',
        ar: 'تصميم وتنفيذ وإدارة بنية تحتية للشبكات قوية للشركات بجميع أحجامها.',
      },
      locale,
    ),
    icon: 'Server',
    features: [
      {
        feature: translate(
          {
            en: 'Network Design',
            ar: 'تصميم الشبكات',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'VPN Solutions',
            ar: 'حلول VPN',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Firewall Configuration',
            ar: 'تكوين جدار الحماية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Network Monitoring',
            ar: 'مراقبة الشبكة',
          },
          locale,
        ),
      },
    ],
    order: 4,
    isActive: true,
  }
}

// Service 5: ERP & CRM
export const service5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'ERP & CRM Solutions',
        ar: 'حلول ERP و CRM',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Enterprise resource planning and customer relationship management systems to streamline your business operations.',
        ar: 'أنظمة تخطيط موارد المؤسسات وإدارة علاقات العملاء لتبسيط عمليات أعمالك.',
      },
      locale,
    ),
    icon: 'BarChart3',
    features: [
      {
        feature: translate(
          {
            en: 'Custom ERP Development',
            ar: 'تطوير ERP مخصص',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'CRM Implementation',
            ar: 'تطبيق CRM',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'System Integration',
            ar: 'تكامل الأنظمة',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Data Migration',
            ar: 'نقل البيانات',
          },
          locale,
        ),
      },
    ],
    order: 5,
    isActive: true,
  }
}

// Service 6: IT Training
export const service6Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'IT Training & Consulting',
        ar: 'التدريب والاستشارات التقنية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Professional training programs and consulting services to upskill your team and optimize your IT strategy.',
        ar: 'برامج تدريب احترافية وخدمات استشارية لتطوير مهارات فريقك وتحسين استراتيجيتك التقنية.',
      },
      locale,
    ),
    icon: 'Users',
    features: [
      {
        feature: translate(
          {
            en: 'Cybersecurity Training',
            ar: 'تدريب الأمن السيبراني',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Technical Workshops',
            ar: 'ورش العمل التقنية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'IT Strategy Consulting',
            ar: 'استشارات الاستراتيجية التقنية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Certification Preparation',
            ar: 'التحضير للشهادات',
          },
          locale,
        ),
      },
    ],
    order: 6,
    isActive: true,
  }
}

// Service 7: Digital Marketing
export const service7Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Digital Marketing',
        ar: 'التسويق الرقمي',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Strategic digital marketing solutions to increase your online presence and reach your target audience effectively.',
        ar: 'حلول تسويق رقمي استراتيجية لزيادة تواجدك عبر الإنترنت والوصول إلى جمهورك المستهدف بفعالية.',
      },
      locale,
    ),
    icon: 'Target',
    features: [
      {
        feature: translate(
          {
            en: 'Social Media Marketing',
            ar: 'التسويق عبر وسائل التواصل',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'SEO Optimization',
            ar: 'تحسين محركات البحث',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Content Marketing',
            ar: 'تسويق المحتوى',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Analytics & Reporting',
            ar: 'التحليلات والتقارير',
          },
          locale,
        ),
      },
    ],
    order: 7,
    isActive: true,
  }
}

// Service 8: Cloud Solutions
export const service8Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Cloud Solutions',
        ar: 'الحلول السحابية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Cloud migration, hosting, and management services to modernize your infrastructure and improve scalability.',
        ar: 'خدمات الهجرة السحابية والاستضافة والإدارة لتحديث بنيتك التحتية وتحسين قابلية التوسع.',
      },
      locale,
    ),
    icon: 'Cloud',
    features: [
      {
        feature: translate(
          {
            en: 'Cloud Migration',
            ar: 'الهجرة السحابية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Cloud Hosting',
            ar: 'الاستضافة السحابية',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'DevOps Services',
            ar: 'خدمات DevOps',
          },
          locale,
        ),
      },
      {
        feature: translate(
          {
            en: 'Cloud Security',
            ar: 'الأمان السحابي',
          },
          locale,
        ),
      },
    ],
    order: 8,
    isActive: true,
  }
}

export const serviceGenerators = [
  service1Generator,
  service2Generator,
  service3Generator,
  service4Generator,
  service5Generator,
  service6Generator,
  service7Generator,
  service8Generator,
]
