import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const headerGenerator = ({
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
              en: 'Home',
              ar: 'الرئيسية',
            },
            locale,
          ),
          url: '/',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'About',
              ar: 'من نحن',
            },
            locale,
          ),
          url: '#about',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Services',
              ar: 'الخدمات',
            },
            locale,
          ),
          url: '#services',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Projects',
              ar: 'المشاريع',
            },
            locale,
          ),
          url: '#projects',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Team',
              ar: 'الفريق',
            },
            locale,
          ),
          url: '#team',
          newTab: false,
        },
      },
      {
        link: {
          type: 'custom',
          label: translate(
            {
              en: 'Contact',
              ar: 'تواصل معنا',
            },
            locale,
          ),
          url: '#contact',
          newTab: false,
        },
      },
    ],
  }
}
