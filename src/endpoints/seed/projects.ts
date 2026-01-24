import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Project 1: 2018 - Company Foundation & First Security Audit
export const project1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'First Enterprise Security Audit',
        ar: 'أول تدقيق أمني للمؤسسات',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Completed our first comprehensive security audit for a major financial institution in Libya, identifying critical vulnerabilities and implementing robust security measures.',
        ar: 'أكملنا أول تدقيق أمني شامل لمؤسسة مالية كبرى في ليبيا، وحددنا نقاط الضعف الحرجة ونفذنا تدابير أمنية قوية.',
      },
      locale,
    ),
    year: '2018',
    yearTitle: translate(
      {
        en: 'Strong Beginning',
        ar: 'بداية قوية',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: 'Successfully Completed',
        ar: 'مكتمل بنجاح',
      },
      locale,
    ),
    icon: 'Shield',
    order: 1,
    isActive: true,
  }
}

// Project 2: 2019 - Government Portal
export const project2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Government Services Portal',
        ar: 'بوابة الخدمات الحكومية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Developed a comprehensive e-government portal enabling citizens to access public services online, improving efficiency and accessibility.',
        ar: 'طورنا بوابة حكومة إلكترونية شاملة تمكن المواطنين من الوصول إلى الخدمات العامة عبر الإنترنت، مما يحسن الكفاءة وإمكانية الوصول.',
      },
      locale,
    ),
    year: '2019',
    yearTitle: translate(
      {
        en: 'Digital Transformation',
        ar: 'التحول الرقمي',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: 'Live & Operational',
        ar: 'مباشر وتشغيلي',
      },
      locale,
    ),
    icon: 'Globe',
    order: 2,
    isActive: true,
  }
}

// Project 3: 2020 - Banking Mobile App
export const project3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Mobile Banking Application',
        ar: 'تطبيق الخدمات المصرفية عبر الجوال',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Created a secure mobile banking application for a leading Libyan bank, enabling customers to manage their accounts, transfers, and payments on the go.',
        ar: 'أنشأنا تطبيق خدمات مصرفية آمن عبر الجوال لبنك ليبي رائد، مما يمكن العملاء من إدارة حساباتهم وتحويلاتهم ومدفوعاتهم أثناء التنقل.',
      },
      locale,
    ),
    year: '2020',
    yearTitle: translate(
      {
        en: 'Mobile First',
        ar: 'الجوال أولاً',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: '50K+ Users',
        ar: '+50 ألف مستخدم',
      },
      locale,
    ),
    icon: 'Smartphone',
    order: 3,
    isActive: true,
  }
}

// Project 4: 2021 - Enterprise ERP
export const project4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Enterprise ERP Implementation',
        ar: 'تطبيق نظام ERP للمؤسسات',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Implemented a comprehensive ERP system for a major oil and gas company, integrating finance, HR, procurement, and operations management.',
        ar: 'نفذنا نظام ERP شامل لشركة نفط وغاز كبرى، يدمج المالية والموارد البشرية والمشتريات وإدارة العمليات.',
      },
      locale,
    ),
    year: '2021',
    yearTitle: translate(
      {
        en: 'Enterprise Solutions',
        ar: 'حلول المؤسسات',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: 'Fully Integrated',
        ar: 'متكامل بالكامل',
      },
      locale,
    ),
    icon: 'Database',
    order: 4,
    isActive: true,
  }
}

// Project 5: 2022 - Network Infrastructure
export const project5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Enterprise Network Overhaul',
        ar: 'إعادة هيكلة شبكة المؤسسة',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Designed and deployed a modern network infrastructure for a telecommunications company, including SD-WAN, advanced firewall systems, and 24/7 monitoring.',
        ar: 'صممنا ونشرنا بنية تحتية حديثة للشبكات لشركة اتصالات، تشمل SD-WAN وأنظمة جدار حماية متقدمة ومراقبة على مدار الساعة.',
      },
      locale,
    ),
    year: '2022',
    yearTitle: translate(
      {
        en: 'Infrastructure Excellence',
        ar: 'التميز في البنية التحتية',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: '99.9% Uptime',
        ar: '99.9% وقت التشغيل',
      },
      locale,
    ),
    icon: 'Server',
    order: 5,
    isActive: true,
  }
}

// Project 6: 2023 - Cybersecurity Operations Center
export const project6Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Security Operations Center',
        ar: 'مركز عمليات الأمن',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Established a state-of-the-art Security Operations Center (SOC) providing 24/7 threat monitoring and incident response for multiple enterprise clients.',
        ar: 'أنشأنا مركز عمليات أمن (SOC) متطور يوفر مراقبة التهديدات والاستجابة للحوادث على مدار الساعة لعدة عملاء من المؤسسات.',
      },
      locale,
    ),
    year: '2023',
    yearTitle: translate(
      {
        en: 'Security Leadership',
        ar: 'الريادة الأمنية',
      },
      locale,
    ),
    status: 'completed',
    statusLabel: translate(
      {
        en: '24/7 Operations',
        ar: 'عمليات على مدار الساعة',
      },
      locale,
    ),
    icon: 'Shield',
    order: 6,
    isActive: true,
  }
}

// Project 7: 2024 - Smart City Platform
export const project7Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Smart City Platform',
        ar: 'منصة المدينة الذكية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Developing an integrated smart city platform for Tripoli, connecting IoT devices, traffic management, and public services into a unified dashboard.',
        ar: 'نطور منصة مدينة ذكية متكاملة لطرابلس، تربط أجهزة إنترنت الأشياء وإدارة المرور والخدمات العامة في لوحة تحكم موحدة.',
      },
      locale,
    ),
    year: '2024',
    yearTitle: translate(
      {
        en: 'Future Vision',
        ar: 'رؤية المستقبل',
      },
      locale,
    ),
    status: 'in_development',
    statusLabel: translate(
      {
        en: 'Phase 2 Active',
        ar: 'المرحلة 2 نشطة',
      },
      locale,
    ),
    icon: 'Building',
    order: 7,
    isActive: true,
  }
}

// Project 8: 2025 - AI-Powered Analytics
export const project8Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'AI-Powered Business Analytics',
        ar: 'تحليلات الأعمال المدعومة بالذكاء الاصطناعي',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Building an advanced analytics platform leveraging AI and machine learning to provide predictive insights for enterprise decision-making.',
        ar: 'نبني منصة تحليلات متقدمة تستفيد من الذكاء الاصطناعي والتعلم الآلي لتقديم رؤى تنبؤية لصنع القرارات المؤسسية.',
      },
      locale,
    ),
    year: '2025',
    yearTitle: translate(
      {
        en: 'AI Innovation',
        ar: 'ابتكار الذكاء الاصطناعي',
      },
      locale,
    ),
    status: 'planning',
    statusLabel: translate(
      {
        en: 'Coming Soon',
        ar: 'قريباً',
      },
      locale,
    ),
    icon: 'BarChart3',
    order: 8,
    isActive: true,
  }
}

export const projectGenerators = [
  project1Generator,
  project2Generator,
  project3Generator,
  project4Generator,
  project5Generator,
  project6Generator,
  project7Generator,
  project8Generator,
]
