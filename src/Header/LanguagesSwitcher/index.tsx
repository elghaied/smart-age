'use client'

import { getLocalizedSlugs } from '@/actions/get-localized-slugs'
import { locales } from '@/i18n/localization'
import { Link, usePathname } from '@/i18n/routing'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

interface Props {
  mobile?: boolean
}

type LocalizedSlugs = {
  en?: string
  fr?: string
  ar?: string
} | null

export default function LanguageSwitcher({ mobile = false }: Props) {
  const locale = useLocale()
  const pathname = usePathname()
  const [slugs, setSlugs] = useState<LocalizedSlugs>(null)

  useEffect(() => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments[0] === 'posts' && segments[1]) {
      // /posts/[slug]
      getLocalizedSlugs('posts', segments[1]).then(setSlugs)
    } else if (segments[0] === 'careers' && segments[1]) {
      // /careers/[slug]
      getLocalizedSlugs('careers', segments[1]).then(setSlugs)
    } else if (segments[0] && segments[0] !== 'posts' && segments[0] !== 'careers') {
      // /[slug] (pages)
      getLocalizedSlugs('pages', segments[0]).then(setSlugs)
    } else {
      setSlugs(null)
    }
  }, [pathname])

  const getLocalizedHref = (targetLocale: string): string => {
    if (!slugs || !slugs[targetLocale as keyof typeof slugs]) {
      return pathname
    }

    if (pathname.startsWith('/posts/')) {
      return `/posts/${slugs[targetLocale as keyof typeof slugs]}`
    }

    if (pathname.startsWith('/careers/')) {
      return `/careers/${slugs[targetLocale as keyof typeof slugs]}`
    }

    // pages
    return `/${slugs[targetLocale as keyof typeof slugs]}`
  }

  return (
    <div className="flex space-x-1 md:space-x-2">
      {locales.map((lang) => (
        <Link
          key={lang}
          href={getLocalizedHref(lang)}
          locale={lang}
          className={`
            px-3 md:px-5 py-1.5 md:py-2 rounded text-base md:text-lg uppercase font-bold font-inter flex items-center justify-center
            ${
              locale === lang
                ? mobile
                  ? 'bg-white text-black'
                  : 'bg-black text-white dark:bg-white dark:text-black'
                : mobile
                  ? 'text-white hover:text-venetian'
                  : 'text-black dark:text-white hover:text-venetian dark:hover:text-venetian'
            }
            transition-colors duration-200 ease-in-out
          `}
        >
          {lang}
        </Link>
      ))}
    </div>
  )
}
