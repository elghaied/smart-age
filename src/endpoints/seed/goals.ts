import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Goal 1: Regional Leadership in Cybersecurity
export const goal1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Become the leading cybersecurity provider in Libya and North Africa, setting the standard for digital protection and security excellence.',
        ar: 'أن نصبح المزود الرائد للأمن السيبراني في ليبيا وشمال أفريقيا، ونضع معيار الحماية الرقمية والتميز الأمني.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Regional Leadership',
        ar: 'الريادة الإقليمية',
      },
      locale,
    ),
    icon: 'Award',
    category: 'strategic',
    timeline: 'long_term',
    order: 1,
    isActive: true,
    progress: 45,
  }
}

// Goal 2: Digital Transformation
export const goal2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Help 100+ Libyan businesses complete their digital transformation journey with modern, secure, and scalable IT solutions.',
        ar: 'مساعدة أكثر من 100 شركة ليبية على إكمال رحلة التحول الرقمي بحلول تقنية حديثة وآمنة وقابلة للتوسع.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Digital Transformation',
        ar: 'التحول الرقمي',
      },
      locale,
    ),
    icon: 'Globe',
    category: 'growth',
    timeline: 'medium_term',
    order: 2,
    isActive: true,
    progress: 60,
  }
}

// Goal 3: Talent Development
export const goal3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Train and certify 500+ IT professionals in cybersecurity and modern development practices, building local expertise.',
        ar: 'تدريب وتأهيل أكثر من 500 متخصص تقني في الأمن السيبراني وممارسات التطوير الحديثة، وبناء الخبرات المحلية.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Talent Development',
        ar: 'تطوير المواهب',
      },
      locale,
    ),
    icon: 'Users',
    category: 'operational',
    timeline: 'medium_term',
    order: 3,
    isActive: true,
    progress: 35,
  }
}

// Goal 4: Customer Excellence
export const goal4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Achieve and maintain a 98% customer satisfaction rate through exceptional service delivery and continuous improvement.',
        ar: 'تحقيق والحفاظ على معدل رضا عملاء بنسبة 98% من خلال تقديم خدمة استثنائية والتحسين المستمر.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Customer Excellence',
        ar: 'التميز في خدمة العملاء',
      },
      locale,
    ),
    icon: 'Heart',
    category: 'customer_focused',
    timeline: 'ongoing',
    order: 4,
    isActive: true,
    progress: 92,
  }
}

// Goal 5: Innovation Hub
export const goal5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Establish an innovation lab focused on emerging technologies like AI, blockchain, and IoT to drive next-generation solutions.',
        ar: 'إنشاء مختبر ابتكار يركز على التقنيات الناشئة مثل الذكاء الاصطناعي والبلوكتشين وإنترنت الأشياء لتطوير حلول الجيل القادم.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Innovation Hub',
        ar: 'مركز الابتكار',
      },
      locale,
    ),
    icon: 'Lightbulb',
    category: 'innovation',
    timeline: 'short_term',
    order: 5,
    isActive: true,
    progress: 20,
  }
}

// Goal 6: Quality Certifications
export const goal6Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    text: translate(
      {
        en: 'Obtain ISO 27001 and SOC 2 certifications to demonstrate our commitment to the highest security and quality standards.',
        ar: 'الحصول على شهادات ISO 27001 و SOC 2 لإثبات التزامنا بأعلى معايير الأمان والجودة.',
      },
      locale,
    ),
    shortTitle: translate(
      {
        en: 'Quality Certifications',
        ar: 'شهادات الجودة',
      },
      locale,
    ),
    icon: 'CheckCircle',
    category: 'quality',
    timeline: 'short_term',
    order: 6,
    isActive: true,
    progress: 70,
  }
}

export const goalGenerators = [
  goal1Generator,
  goal2Generator,
  goal3Generator,
  goal4Generator,
  goal5Generator,
  goal6Generator,
]
