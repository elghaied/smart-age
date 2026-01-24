import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const homepageGenerator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    hero: {
      title: translate(
        {
          en: 'Smart Age Information Technology',
          ar: 'سمارت إيج لتقنية المعلومات',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Your Trusted IT Partner in Libya',
          ar: 'شريكك التقني الموثوق في ليبيا',
        },
        locale,
      ),
      description: translate(
        {
          en: 'We believe in the power of technology to transform businesses and develop communities. Since 2018, we have been delivering innovative IT solutions in cybersecurity, software development, and digital transformation.',
          ar: 'نؤمن بقوة التكنولوجيا في تحويل الأعمال وتطوير المجتمعات. منذ 2018، نقدم حلولاً تقنية مبتكرة في الأمن السيبراني وتطوير البرمجيات والتحول الرقمي.',
        },
        locale,
      ),
      features: [
        {
          text: translate(
            {
              en: 'Cybersecurity Excellence',
              ar: 'التميز في الأمن السيبراني',
            },
            locale,
          ),
        },
        {
          text: translate(
            {
              en: 'Custom Software Solutions',
              ar: 'حلول برمجية مخصصة',
            },
            locale,
          ),
        },
        {
          text: translate(
            {
              en: 'Digital Transformation',
              ar: 'التحول الرقمي',
            },
            locale,
          ),
        },
        {
          text: translate(
            {
              en: '24/7 Technical Support',
              ar: 'دعم فني على مدار الساعة',
            },
            locale,
          ),
        },
      ],
      primaryCTA: {
        text: translate(
          {
            en: 'Get Started',
            ar: 'ابدأ الآن',
          },
          locale,
        ),
        link: '#contact',
      },
      secondaryCTA: {
        text: translate(
          {
            en: 'Learn More',
            ar: 'اعرف المزيد',
          },
          locale,
        ),
        link: '#about',
      },
      established: translate(
        {
          en: 'Est. 2018',
          ar: 'تأسست 2018',
        },
        locale,
      ),
      location: translate(
        {
          en: 'Tripoli, Libya',
          ar: 'طرابلس، ليبيا',
        },
        locale,
      ),
    },
    about: {
      title: translate(
        {
          en: 'About Smart Age',
          ar: 'عن سمارت إيج',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Pioneering IT Solutions Since 2018',
          ar: 'ريادة الحلول التقنية منذ 2018',
        },
        locale,
      ),
      mission: {
        title: translate(
          {
            en: 'Our Mission',
            ar: 'مهمتنا',
          },
          locale,
        ),
      },
      valuesTitle: translate(
        {
          en: 'Our Core Values',
          ar: 'قيمنا الأساسية',
        },
        locale,
      ),
      aboutUsCallToAction: {
        title: translate(
          {
            en: 'Ready to Transform Your Business?',
            ar: 'مستعد لتحويل أعمالك؟',
          },
          locale,
        ),
        description: translate(
          {
            en: 'Partner with Smart Age and leverage our expertise to achieve your digital goals.',
            ar: 'شارك مع سمارت إيج واستفد من خبرتنا لتحقيق أهدافك الرقمية.',
          },
          locale,
        ),
        strongPoints: [
          {
            point: translate(
              {
                en: '6+ Years of Experience',
                ar: '6+ سنوات من الخبرة',
              },
              locale,
            ),
          },
          {
            point: translate(
              {
                en: '50+ Successful Projects',
                ar: '50+ مشروع ناجح',
              },
              locale,
            ),
          },
          {
            point: translate(
              {
                en: '100+ Satisfied Clients',
                ar: '100+ عميل راضٍ',
              },
              locale,
            ),
          },
        ],
      },
    },
    whyUs: {
      title: translate(
        {
          en: 'Why Choose Smart Age?',
          ar: 'لماذا سمارت إيج؟',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'What Sets Us Apart',
          ar: 'ما يميزنا',
        },
        locale,
      ),
    },
    goals: {
      title: translate(
        {
          en: 'Our Goals',
          ar: 'أهدافنا',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Driving Towards Excellence',
          ar: 'نسعى نحو التميز',
        },
        locale,
      ),
    },
    projects: {
      title: translate(
        {
          en: 'Our Journey',
          ar: 'مسيرتنا',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Projects & Milestones',
          ar: 'المشاريع والإنجازات',
        },
        locale,
      ),
      description: translate(
        {
          en: 'Explore our timeline of successful projects and key achievements since our founding in 2018.',
          ar: 'استكشف الخط الزمني لمشاريعنا الناجحة وإنجازاتنا الرئيسية منذ تأسيسنا في 2018.',
        },
        locale,
      ),
    },
    services: {
      title: translate(
        {
          en: 'Our Services',
          ar: 'خدماتنا',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Comprehensive IT Solutions',
          ar: 'حلول تقنية شاملة',
        },
        locale,
      ),
      description: translate(
        {
          en: 'From cybersecurity to digital transformation, we offer a complete range of IT services tailored to your needs.',
          ar: 'من الأمن السيبراني إلى التحول الرقمي، نقدم مجموعة كاملة من الخدمات التقنية المصممة لاحتياجاتك.',
        },
        locale,
      ),
      servicesCallToAction: {
        miniTitle: translate(
          {
            en: 'Need a Custom Solution?',
            ar: 'تحتاج حلاً مخصصاً؟',
          },
          locale,
        ),
        title: translate(
          {
            en: "Let's Discuss Your Project",
            ar: 'دعنا نناقش مشروعك',
          },
          locale,
        ),
        description: translate(
          {
            en: 'Our team is ready to help you find the perfect solution for your business challenges.',
            ar: 'فريقنا جاهز لمساعدتك في إيجاد الحل المثالي لتحديات أعمالك.',
          },
          locale,
        ),
        buttonText: translate(
          {
            en: 'Contact Us',
            ar: 'تواصل معنا',
          },
          locale,
        ),
        buttonLink: '#contact',
      },
    },
    team: {
      title: translate(
        {
          en: 'Meet Our Team',
          ar: 'تعرف على فريقنا',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: 'Expert Professionals',
          ar: 'متخصصون خبراء',
        },
        locale,
      ),
      description: translate(
        {
          en: 'Our team of certified professionals brings together decades of experience in IT, cybersecurity, and digital solutions.',
          ar: 'يجمع فريقنا من المتخصصين المعتمدين عقوداً من الخبرة في تكنولوجيا المعلومات والأمن السيبراني والحلول الرقمية.',
        },
        locale,
      ),
      stats: {
        expertsCount: '15+',
        experienceYears: '50+',
        certificationsCount: '30+',
        supportAvailability: translate(
          {
            en: '24/7 Support',
            ar: 'دعم على مدار الساعة',
          },
          locale,
        ),
      },
      teamCallToAction: {
        title: translate(
          {
            en: 'Join Our Team',
            ar: 'انضم إلى فريقنا',
          },
          locale,
        ),
        description: translate(
          {
            en: "We're always looking for talented professionals to join our growing team.",
            ar: 'نبحث دائماً عن متخصصين موهوبين للانضمام إلى فريقنا المتنامي.',
          },
          locale,
        ),
        viewPositionsButtonText: translate(
          {
            en: 'View Open Positions',
            ar: 'عرض الوظائف المتاحة',
          },
          locale,
        ),
        viewPositionsButtonLink: '#careers',
        joinUsButtonText: translate(
          {
            en: 'Send Your CV',
            ar: 'أرسل سيرتك الذاتية',
          },
          locale,
        ),
        joinUsButtonLink: 'mailto:careers@smartage-tech.com.ly',
      },
    },
    contact: {
      title: translate(
        {
          en: 'Contact Us',
          ar: 'تواصل معنا',
        },
        locale,
      ),
      subtitle: translate(
        {
          en: "Let's Start a Conversation",
          ar: 'لنبدأ الحوار',
        },
        locale,
      ),
      description: translate(
        {
          en: "Have a project in mind? We'd love to hear from you. Reach out to discuss how we can help transform your business.",
          ar: 'لديك مشروع في ذهنك؟ يسعدنا سماعك. تواصل معنا لمناقشة كيف يمكننا المساعدة في تحويل أعمالك.',
        },
        locale,
      ),
      contactCallToAction: {
        title: translate(
          {
            en: 'Get in Touch',
            ar: 'تواصل معنا',
          },
          locale,
        ),
        description: translate(
          {
            en: 'Our team responds within 24 hours',
            ar: 'فريقنا يرد خلال 24 ساعة',
          },
          locale,
        ),
        callUsButtonText: translate(
          {
            en: 'Call Us',
            ar: 'اتصل بنا',
          },
          locale,
        ),
        emailUsButtonText: translate(
          {
            en: 'Email Us',
            ar: 'راسلنا',
          },
          locale,
        ),
      },
    },
  }
}
