// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'
import { en } from '@payloadcms/translations/languages/en'
import { ar } from '@payloadcms/translations/languages/ar'
import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { Values } from './collections/Values'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Goals } from './collections/Goals'
import { Features } from './collections/Features'
import { TeamMembers } from './collections/TeamMembers'
import { ContactInfo } from './globals/ContactInfo'
import { Homepage } from './globals/LandingPage'
import { SiteSettings } from './globals/SiteSettings'
import localization from './i18n/localization'
import { Careers } from './collections/Careers'
import { Applications } from './collections/Applications'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Helper function to create email config conditionally
const getEmailConfig = () => {
  // Skip email configuration during build or if explicitly disabled
  if (process.env.SKIP_EMAIL_VERIFICATION === 'true' || !process.env.SMTP_HOST) {
    console.log('Skipping email configuration (build time or missing SMTP_HOST)')
    return undefined
  }

  return nodemailerAdapter({
    defaultFromAddress: 'contact@smartage-tech.com.ly',
    defaultFromName: 'smartage-tech',
    // Nodemailer transportOptions
    transportOptions: {
      host: process.env.SMTP_HOST!,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER!,
        pass: process.env.SMTP_PASS!,
      },
    },
  })
}
export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    components: {
      beforeDashboard: ['@/components/BeforeDashboard/SeedButton'],
    },
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  collections: [
    Pages,
    Posts,
    Media,
    Categories,
    Users,
    Values,
    Services,
    Projects,
    Goals,
    Features,
    TeamMembers,
    Careers,
    Applications,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer, ContactInfo, Homepage, SiteSettings],
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
  localization,
  i18n: {
    supportedLanguages: { en, ar },
    fallbackLanguage: 'en',
  },
  email: getEmailConfig(),
})
