import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Feature 1: Local Expertise
export const feature1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Local Expertise',
        ar: 'خبرة محلية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Deep understanding of the Libyan market with solutions tailored to local business needs and regulatory requirements.',
        ar: 'فهم عميق للسوق الليبي مع حلول مصممة خصيصاً لاحتياجات الأعمال المحلية والمتطلبات التنظيمية.',
      },
      locale,
    ),
    icon: 'Globe',
    order: 1,
    isActive: true,
    link: {
      url: '#about',
      text: translate(
        {
          en: 'Learn More',
          ar: 'اعرف المزيد',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

// Feature 2: Certified Team
export const feature2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Certified Professionals',
        ar: 'متخصصون معتمدون',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Our team holds certifications from leading vendors including Cisco, Microsoft, AWS, and CompTIA Security+.',
        ar: 'يحمل فريقنا شهادات من كبار المزودين بما في ذلك سيسكو ومايكروسوفت وأمازون ويب سيرفيسز وCompTIA Security+.',
      },
      locale,
    ),
    icon: 'Award',
    order: 2,
    isActive: true,
    link: {
      url: '#team',
      text: translate(
        {
          en: 'Meet the Team',
          ar: 'تعرف على الفريق',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

// Feature 3: 24/7 Support
export const feature3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: '24/7 Support',
        ar: 'دعم على مدار الساعة',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Round-the-clock technical support and monitoring to ensure your systems are always running smoothly.',
        ar: 'دعم فني ومراقبة على مدار الساعة لضمان تشغيل أنظمتك بسلاسة دائماً.',
      },
      locale,
    ),
    icon: 'Clock',
    order: 3,
    isActive: true,
    link: {
      url: '#contact',
      text: translate(
        {
          en: 'Get Support',
          ar: 'احصل على الدعم',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

// Feature 4: Security Focus
export const feature4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Security First Approach',
        ar: 'نهج الأمان أولاً',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Every solution we deliver is built with security at its core, protecting your business from evolving cyber threats.',
        ar: 'كل حل نقدمه مبني مع الأمان في جوهره، يحمي أعمالك من التهديدات السيبرانية المتطورة.',
      },
      locale,
    ),
    icon: 'Shield',
    order: 4,
    isActive: true,
    link: {
      url: '#services',
      text: translate(
        {
          en: 'Our Services',
          ar: 'خدماتنا',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

// Feature 5: Proven Track Record
export const feature5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Proven Track Record',
        ar: 'سجل حافل بالنجاحات',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Since 2018, we have successfully delivered 50+ projects for clients across government, finance, oil & gas, and telecommunications.',
        ar: 'منذ 2018، أنجزنا بنجاح أكثر من 50 مشروعاً لعملاء في القطاع الحكومي والمالي والنفط والغاز والاتصالات.',
      },
      locale,
    ),
    icon: 'Target',
    order: 5,
    isActive: true,
    link: {
      url: '#projects',
      text: translate(
        {
          en: 'View Projects',
          ar: 'عرض المشاريع',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

// Feature 6: Fast Response
export const feature6Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Rapid Response',
        ar: 'استجابة سريعة',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Quick turnaround times and agile methodology ensure your projects are delivered on time and within budget.',
        ar: 'أوقات تنفيذ سريعة ومنهجية رشيقة تضمن تسليم مشاريعك في الوقت المحدد وضمن الميزانية.',
      },
      locale,
    ),
    icon: 'Zap',
    order: 6,
    isActive: true,
    link: {
      url: '#contact',
      text: translate(
        {
          en: 'Start a Project',
          ar: 'ابدأ مشروعاً',
        },
        locale,
      ),
      openInNewTab: false,
    },
  }
}

export const featureGenerators = [
  feature1Generator,
  feature2Generator,
  feature3Generator,
  feature4Generator,
  feature5Generator,
  feature6Generator,
]
