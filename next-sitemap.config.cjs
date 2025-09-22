const SITE_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: [
    '/posts-sitemap.xml',
    '/pages-sitemap.xml',
    '/*', // exclude root catch-all
    '/posts/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: '/admin/*',
      },
    ],
    // ✅ include localized sitemaps
    additionalSitemaps: [
      `${SITE_URL}/en/pages-sitemap.xml`,
      `${SITE_URL}/en/posts-sitemap.xml`,
      `${SITE_URL}/ar/pages-sitemap.xml`,
      `${SITE_URL}/ar/posts-sitemap.xml`,
    ],
  },
}
