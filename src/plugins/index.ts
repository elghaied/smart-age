import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'

import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { s3Storage } from '@payloadcms/storage-s3'
const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Smart Age Tech` : 'Smart Age Tech'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

// S3 storage plugin - only enabled when S3 environment variables are set
const s3StoragePlugin: Plugin[] = process.env.S3_BUCKET
  ? [
      s3Storage({
        collections: {
          media: {
            prefix: 'media',
            // Generate direct S3/MinIO URLs instead of proxying through Payload API
            generateFileURL: ({ filename, prefix }) => {
              const endpoint = process.env.S3_ENDPOINT || ''
              const bucket = process.env.S3_BUCKET || ''
              // Path-style URL format for MinIO: endpoint/bucket/prefix/filename
              return `${endpoint}/${bucket}/${prefix}/${filename}`
            },
          },
        },
        bucket: process.env.S3_BUCKET,
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
          },
          region: process.env.S3_REGION || 'us-east-1',
          forcePathStyle: true, // Required for MinIO
          endpoint: process.env.S3_ENDPOINT,
        },
      }),
    ]
  : []
export const plugins: Plugin[] = [
  ...s3StoragePlugin,
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
    globals: ['homepage'],
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        const modifiedFields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
        return [
          ...modifiedFields,
          {
            name: 'requireRecaptcha',
            type: 'checkbox',
            label: 'Require reCAPTCHA',
            defaultValue: false,
          },
        ]
      },
    },
    formSubmissionOverrides: {
      fields: ({ defaultFields }) => {
        return [
          ...defaultFields,
          {
            name: 'recaptcha',
            type: 'text',
            admin: {
              readOnly: true,
            },
            validate: async (value: any, { req, siblingData }: any) => {
              if (!siblingData?.form) {
                return true
              }

              const form = await req.payload.findByID({
                id: siblingData.form,
                collection: 'forms',
              })

              if (!form.requireRecaptcha) {
                return true
              }

              if (!value) {
                return 'Please complete the reCAPTCHA'
              }

              const res: Response = await fetch(
                `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${value}`,
                {
                  method: 'POST',
                },
              )

              const data: any = await res.json()

              if (!data.success) {
                return 'Invalid captcha'
              }

              return true
            },
          },
        ]
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
]
