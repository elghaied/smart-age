import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const siteSettingsGenerator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    siteName: translate(
      {
        en: 'Smart Age Information Technology',
        ar: 'سمارت إيج لتقنية المعلومات',
      },
      locale,
    ),
    siteUrl: 'https://smartage-tech.com.ly',
    defaultLocale: 'ar',
    supportedLocales: [{ locale: 'ar' }, { locale: 'en' }],
    branding: {
      primaryColor: '#0066CC',
      secondaryColor: '#00A86B',
    },
    defaultSEO: {
      title: translate(
        {
          en: 'Smart Age IT - Technology Solutions in Libya',
          ar: 'سمارت إيج - حلول تقنية في ليبيا',
        },
        locale,
      ),
      description: translate(
        {
          en: 'Smart Age Information Technology - Leading IT company in Libya specializing in cybersecurity, web development, mobile apps, networking, ERP/CRM solutions, and digital marketing since 2018.',
          ar: 'سمارت إيج لتقنية المعلومات - شركة تقنية رائدة في ليبيا متخصصة في الأمن السيبراني وتطوير الويب وتطبيقات الجوال والشبكات وحلول ERP/CRM والتسويق الرقمي منذ 2018.',
        },
        locale,
      ),
      keywords: translate(
        {
          en: 'IT Libya, cybersecurity Libya, web development Tripoli, mobile app development, ERP solutions, digital transformation, networking, IT training',
          ar: 'تقنية المعلومات ليبيا، الأمن السيبراني ليبيا، تطوير الويب طرابلس، تطوير تطبيقات الجوال، حلول ERP، التحول الرقمي، الشبكات، التدريب التقني',
        },
        locale,
      ),
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: '',
      gtmId: '',
    },
  }
}
