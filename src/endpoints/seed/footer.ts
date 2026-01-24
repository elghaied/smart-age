import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const footerGenerator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    navItems: [
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Privacy Policy',
              ar: 'سياسة الخصوصية',
            },
            locale,
          ),
          url: '/privacy',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Terms of Service',
              ar: 'شروط الخدمة',
            },
            locale,
          ),
          url: '/terms',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Careers',
              ar: 'الوظائف',
            },
            locale,
          ),
          url: '/careers',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Blog',
              ar: 'المدونة',
            },
            locale,
          ),
          url: '/posts',
          newTab: false,
        },
      },
    ],
    footerLabels: {
      footerWording: translate(
        {
          en: 'Smart Age Information Technology - Empowering businesses through innovative IT solutions since 2018.',
          ar: 'سمارت إيج لتقنية المعلومات - نمكّن الأعمال من خلال حلول تقنية مبتكرة منذ 2018.',
        },
        locale,
      ),
      footerQuickLinksLabel: translate(
        {
          en: 'Quick Links',
          ar: 'روابط سريعة',
        },
        locale,
      ),
    },
  }
}
