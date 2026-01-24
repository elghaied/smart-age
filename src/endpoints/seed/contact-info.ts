import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const contactInfoGenerator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    label: 'Main Contact Info',
    contactInfo: {
      address: translate(
        {
          en: 'Tripoli, Libya',
          ar: 'طرابلس، ليبيا',
        },
        locale,
      ),
      mapLink: 'https://maps.google.com/?q=Tripoli,Libya',
      phone: '+218 91 000 0000',
      email: 'contact@smartage-tech.com.ly',
      workingHours: translate(
        {
          en: 'Sunday - Thursday: 8AM - 6PM',
          ar: 'الأحد - الخميس: 8 صباحاً - 6 مساءً',
        },
        locale,
      ),
    },
    labels: {
      address: translate(
        {
          en: 'Our Address',
          ar: 'عنواننا',
        },
        locale,
      ),
      phone: translate(
        {
          en: 'Phone',
          ar: 'الهاتف',
        },
        locale,
      ),
      email: translate(
        {
          en: 'Email',
          ar: 'البريد الإلكتروني',
        },
        locale,
      ),
      hours: translate(
        {
          en: 'Working Hours',
          ar: 'ساعات العمل',
        },
        locale,
      ),
    },
    socialMedia: {
      title: translate(
        {
          en: 'Follow Us',
          ar: 'تابعنا',
        },
        locale,
      ),
      facebook: 'https://facebook.com/smartagetech',
      twitter: 'https://twitter.com/smartagetech',
      instagram: 'https://instagram.com/smartagetech',
      linkedin: 'https://linkedin.com/company/smartage-tech',
    },
  }
}
