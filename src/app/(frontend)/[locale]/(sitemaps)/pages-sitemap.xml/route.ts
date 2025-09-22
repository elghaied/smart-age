import { getServerSideSitemap } from 'next-sitemap'
import { getPayload, TypedLocale } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async (locale: TypedLocale) => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      locale, // ✅ now include locale properly
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

    const dateFallback = new Date().toISOString()

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug))
          .map((page) => ({
            loc: `${SITE_URL}/${locale}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }))
      : []

    return sitemap
  },
  ['pages-sitemap'],
  { tags: ['pages-sitemap'] },
)

// ✅ Fix: accept only Request, and grab locale from pathname
export async function GET(request: Request) {
  const { pathname } = new URL(request.url)
  const locale = pathname.split('/')[1] as TypedLocale // e.g. "/en/(sitemaps)/pages-sitemap.xml"

  const sitemap = await getPagesSitemap(locale)

  return getServerSideSitemap(sitemap)
}
