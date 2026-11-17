import { withPayload } from '@payloadcms/next/withPayload'
import createNextIntlPlugin from 'next-intl/plugin'
import redirects from './redirects.js'

const withNextIntl = createNextIntlPlugin()

const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : null)
  || process.env.__NEXT_PRIVATE_ORIGIN
  || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    // Next 16 only allows quality 75 by default; ImageMedia requests 100
    qualities: [75, 100],
    // Payload's S3 adapter appends ?prefix=media to media URLs; Next 16 rejects local
    // query strings unless a pattern allows them. Everything else: no query, as before.
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/**', search: '' }],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  // Next 16 builds with Turbopack by default; this key acknowledges the webpack config above
  turbopack: {},
  redirects,
}
export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
