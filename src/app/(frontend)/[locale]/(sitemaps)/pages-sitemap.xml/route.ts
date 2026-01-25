import { getServerSideSitemap } from 'next-sitemap'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { locales } from '@/i18n/localization'
 

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

// Helper to create alternateRefs for a given path pattern
const createAlternateRefs = (pathTemplate: (locale: TypedLocale) => string) =>
  locales.map((locale) => ({
    href: `${SITE_URL}${pathTemplate(locale as TypedLocale)}`,
    hreflang: locale,
  }))

// Helper to create entries for all locales
const createLocaleEntries = (
  pathTemplate: (locale: TypedLocale) => string,
  lastmod: string,
) =>
  locales.map((locale) => ({
    loc: `${SITE_URL}${pathTemplate(locale as TypedLocale)}`,
    lastmod,
    alternateRefs: createAlternateRefs(pathTemplate),
  }))

const getPagesSitemap = unstable_cache(
  async () => {
    const dateFallback = new Date().toISOString()
    const sitemap: Array<{
      loc: string
      lastmod: string
      alternateRefs: Array<{ href: string; hreflang: string }>
    }> = []

    // 1. Homepage entries for all locales (from Homepage Global)
    const homepageEntries = createLocaleEntries(
      (locale) => `/${locale}`,
      dateFallback,
    )
    sitemap.push(...homepageEntries)

    // 2. Static pages: search and posts listing
    const searchEntries = createLocaleEntries(
      (locale) => `/${locale}/search`,
      dateFallback,
    )
    sitemap.push(...searchEntries)

    const postsListingEntries = createLocaleEntries(
      (locale) => `/${locale}/posts`,
      dateFallback,
    )
    sitemap.push(...postsListingEntries)

    // 3. Dynamic pages from Pages collection
    try {
      const payload = await getPayload({ config })

      const results = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      if (results.docs && results.docs.length > 0) {
        const pageEntries = results.docs
          .filter((page) => Boolean(page?.slug) && page.slug !== 'home')
          .flatMap((page) =>
            createLocaleEntries(
              (locale) => `/${locale}/${page.slug}`,
              page.updatedAt || dateFallback,
            ),
          )
        sitemap.push(...pageEntries)
      }
    } catch (error) {
      // Database unavailable during build - continue with static entries only
      console.warn('Pages sitemap: Database unavailable, using static entries only')

    }

    return sitemap
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()
  return getServerSideSitemap(sitemap)
}
