import type { TypedLocale } from 'payload'
import { translate } from './utils'

// Team Member 1: CEO / Founder
export const teamMember1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Ahmed Al-Mansouri',
        ar: 'أحمد المنصوري',
      },
      locale,
    ),
    role: translate(
      {
        en: 'CEO & Founder',
        ar: 'الرئيس التنفيذي والمؤسس',
      },
      locale,
    ),
    description: translate(
      {
        en: 'With over 15 years of experience in IT and cybersecurity, Ahmed founded Smart Age to bring world-class technology solutions to Libya. He holds CISSP and CISM certifications.',
        ar: 'بخبرة تزيد عن 15 عاماً في تكنولوجيا المعلومات والأمن السيبراني، أسس أحمد سمارت إيج لتقديم حلول تقنية عالمية المستوى إلى ليبيا. يحمل شهادات CISSP و CISM.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Strategic Planning',
            ar: 'التخطيط الاستراتيجي',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Cybersecurity',
            ar: 'الأمن السيبراني',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Business Development',
            ar: 'تطوير الأعمال',
          },
          locale,
        ),
      },
    ],
    order: 1,
    isActive: true,
  }
}

// Team Member 2: CTO
export const teamMember2Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Fatima Ben Salem',
        ar: 'فاطمة بن سالم',
      },
      locale,
    ),
    role: translate(
      {
        en: 'Chief Technology Officer',
        ar: 'الرئيس التنفيذي للتكنولوجيا',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Fatima leads our technical teams with expertise in software architecture and cloud solutions. She has delivered enterprise solutions for Fortune 500 companies before joining Smart Age.',
        ar: 'تقود فاطمة فرقنا التقنية بخبرة في هندسة البرمجيات والحلول السحابية. قدمت حلولاً للمؤسسات لشركات فورتشن 500 قبل انضمامها إلى سمارت إيج.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Software Architecture',
            ar: 'هندسة البرمجيات',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Cloud Computing',
            ar: 'الحوسبة السحابية',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Team Leadership',
            ar: 'قيادة الفريق',
          },
          locale,
        ),
      },
    ],
    order: 2,
    isActive: true,
  }
}

// Team Member 3: Security Director
export const teamMember3Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Omar Al-Sharif',
        ar: 'عمر الشريف',
      },
      locale,
    ),
    role: translate(
      {
        en: 'Director of Security',
        ar: 'مدير الأمن',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Omar oversees all cybersecurity operations and incident response. A certified ethical hacker with CEH and OSCP certifications, he has protected critical infrastructure across the region.',
        ar: 'يشرف عمر على جميع عمليات الأمن السيبراني والاستجابة للحوادث. قرصان أخلاقي معتمد بشهادات CEH و OSCP، حمى البنية التحتية الحيوية في جميع أنحاء المنطقة.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Penetration Testing',
            ar: 'اختبار الاختراق',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Incident Response',
            ar: 'الاستجابة للحوادث',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Security Operations',
            ar: 'عمليات الأمن',
          },
          locale,
        ),
      },
    ],
    order: 3,
    isActive: true,
  }
}

// Team Member 4: Development Lead
export const teamMember4Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Youssef Belkaid',
        ar: 'يوسف بلقايد',
      },
      locale,
    ),
    role: translate(
      {
        en: 'Lead Software Developer',
        ar: 'كبير مطوري البرمجيات',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Youssef leads our development team specializing in web and mobile applications. With expertise in React, Node.js, and mobile frameworks, he ensures high-quality code delivery.',
        ar: 'يقود يوسف فريق التطوير لدينا المتخصص في تطبيقات الويب والجوال. بخبرة في React و Node.js وأطر الجوال، يضمن تقديم كود عالي الجودة.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Web Development',
            ar: 'تطوير الويب',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Mobile Apps',
            ar: 'تطبيقات الجوال',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'API Design',
            ar: 'تصميم واجهات البرمجة',
          },
          locale,
        ),
      },
    ],
    order: 4,
    isActive: true,
  }
}

// Team Member 5: Network Engineer
export const teamMember5Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Layla Osman',
        ar: 'ليلى عثمان',
      },
      locale,
    ),
    role: translate(
      {
        en: 'Senior Network Engineer',
        ar: 'مهندسة شبكات أولى',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Layla designs and implements enterprise network solutions. Cisco CCNP certified, she has deployed network infrastructure for organizations across Libya and the region.',
        ar: 'تصمم ليلى وتنفذ حلول شبكات المؤسسات. معتمدة من سيسكو CCNP، نشرت بنية تحتية للشبكات لمنظمات في جميع أنحاء ليبيا والمنطقة.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Network Architecture',
            ar: 'هندسة الشبكات',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Cisco Technologies',
            ar: 'تقنيات سيسكو',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Network Security',
            ar: 'أمن الشبكات',
          },
          locale,
        ),
      },
    ],
    order: 5,
    isActive: true,
  }
}

// Team Member 6: Project Manager
export const teamMember6Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    name: translate(
      {
        en: 'Khalid Benali',
        ar: 'خالد بن علي',
      },
      locale,
    ),
    role: translate(
      {
        en: 'Senior Project Manager',
        ar: 'مدير مشاريع أول',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Khalid ensures our projects are delivered on time and within budget. PMP certified with experience managing complex IT implementations for government and enterprise clients.',
        ar: 'يضمن خالد تسليم مشاريعنا في الوقت المحدد وضمن الميزانية. معتمد PMP مع خبرة في إدارة تطبيقات تقنية معقدة للعملاء الحكوميين والمؤسسات.',
      },
      locale,
    ),
    specialties: [
      {
        specialty: translate(
          {
            en: 'Project Management',
            ar: 'إدارة المشاريع',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Agile Methodology',
            ar: 'المنهجية الرشيقة',
          },
          locale,
        ),
      },
      {
        specialty: translate(
          {
            en: 'Stakeholder Management',
            ar: 'إدارة أصحاب المصلحة',
          },
          locale,
        ),
      },
    ],
    order: 6,
    isActive: true,
  }
}

export const teamMemberGenerators = [
  teamMember1Generator,
  teamMember2Generator,
  teamMember3Generator,
  teamMember4Generator,
  teamMember5Generator,
  teamMember6Generator,
]
