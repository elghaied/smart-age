import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { defaultLocale, locales } from '@/i18n/localization'

const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const getPostsSitemap = unstable_cache(
  async () => {
    try {
      const payload = await getPayload({ config })
      const dateFallback = new Date().toISOString()

      // Fetch posts - we'll get the slugs which should be the same across locales
      const results = await payload.find({
        collection: 'posts',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        locale: defaultLocale,
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

      if (!results.docs || results.docs.length === 0) {
        return []
      }

      // Generate sitemap entries for each post with all locale variations
      const sitemap = results.docs
        .filter((post) => Boolean(post?.slug))
        .flatMap((post) => {
          // Create alternateRefs for all locales
          const alternateRefs = locales.map((locale) => ({
            href: `${SITE_URL}/${locale}/posts/${post.slug}`,
            hreflang: locale,
          }))

          // Create an entry for each locale
          return locales.map((locale) => ({
            loc: `${SITE_URL}/${locale}/posts/${post.slug}`,
            lastmod: post.updatedAt || dateFallback,
            alternateRefs,
          }))
        })

      return sitemap
    } catch (error) {
      // Database unavailable during build - return empty sitemap
      console.warn('Posts sitemap: Database unavailable, returning empty sitemap')
      return []
    }
  },
  ['posts-sitemap'],
  {
    tags: ['posts-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPostsSitemap()
  return getServerSideSitemap(sitemap)
}
