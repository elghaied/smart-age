import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Value 1: Innovation
export const value1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Innovation',
        ar: 'الابتكار',
      },
      locale,
    ),
    description: translate(
      {
        en: 'We continuously embrace new technologies and creative solutions to stay ahead in the rapidly evolving IT landscape.',
        ar: 'نتبنى باستمرار التقنيات الجديدة والحلول الإبداعية للبقاء في مقدمة مشهد تكنولوجيا المعلومات المتطور بسرعة.',
      },
      locale,
    ),
    icon: 'Lightbulb',
    order: 1,
    isActive: true,
  }
}

// Value 2: Security First
export const value2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Security First',
        ar: 'الأمان أولاً',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Cybersecurity is at the core of everything we do. We protect our clients\' data and systems with the highest standards.',
        ar: 'الأمن السيبراني هو جوهر كل ما نقوم به. نحمي بيانات وأنظمة عملائنا بأعلى المعايير.',
      },
      locale,
    ),
    icon: 'Shield',
    order: 2,
    isActive: true,
  }
}

// Value 3: Excellence
export const value3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Excellence',
        ar: 'التميز',
      },
      locale,
    ),
    description: translate(
      {
        en: 'We strive for excellence in every project, delivering solutions that exceed expectations and drive real business value.',
        ar: 'نسعى للتميز في كل مشروع، ونقدم حلولاً تتجاوز التوقعات وتحقق قيمة تجارية حقيقية.',
      },
      locale,
    ),
    icon: 'Award',
    order: 3,
    isActive: true,
  }
}

// Value 4: Partnership
export const value4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Partnership',
        ar: 'الشراكة',
      },
      locale,
    ),
    description: translate(
      {
        en: 'We build lasting relationships with our clients, working together as partners to achieve shared success.',
        ar: 'نبني علاقات دائمة مع عملائنا، ونعمل معاً كشركاء لتحقيق النجاح المشترك.',
      },
      locale,
    ),
    icon: 'Handshake',
    order: 4,
    isActive: true,
  }
}

// Value 5: Local Expertise
export const value5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    title: translate(
      {
        en: 'Local Expertise',
        ar: 'الخبرة المحلية',
      },
      locale,
    ),
    description: translate(
      {
        en: 'As a Libyan company, we understand the unique challenges and opportunities in our market and provide tailored solutions.',
        ar: 'كشركة ليبية، نفهم التحديات والفرص الفريدة في سوقنا ونقدم حلولاً مخصصة.',
      },
      locale,
    ),
    icon: 'Globe',
    order: 5,
    isActive: true,
  }
}

export const valueGenerators = [
  value1Generator,
  value2Generator,
  value3Generator,
  value4Generator,
  value5Generator,
]
