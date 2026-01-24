# Payload CMS Seed Implementation Guide

This guide explains how to build a database seed system for Payload CMS projects with internationalization (i18n) support. The pattern creates seed data for all locales in a single operation.

## Architecture Overview

```
src/endpoints/seed/
├── index.ts          # Main orchestrator - clears collections and seeds data
├── utils.ts          # Core utilities: seedCollection, seedGlobal, translate
├── [collection].ts   # Generator functions for each collection (e.g., projects.ts)
└── [global].ts       # Generator functions for globals (e.g., homepage.ts)

src/app/(frontend)/next/seed/
└── route.ts          # API route to trigger seeding (POST /next/seed)

src/components/BeforeDashboard/SeedButton/
├── index.tsx         # UI button for admin panel
└── index.scss        # Optional styling
```

## Step 1: Create the Utils File

Create `src/endpoints/seed/utils.ts` with these core utilities:

```typescript
import type { CollectionSlug, GlobalSlug, Payload, TypedLocale } from 'payload'

// Define your project's locales - update these to match your payload.config.ts
export const LOCALES: TypedLocale[] = ['en', 'ar', 'fr']  // Adjust to your locales
export const DEFAULT_LOCALE: TypedLocale = 'en'

// Type helper for translations
export type Translations = {
  en: string
  ar: string
  fr: string
}

// Helper function to get localized value
export const translate = (translations: Translations, locale: TypedLocale): string => {
  return translations[locale] || translations[DEFAULT_LOCALE]
}

// Seed a collection item with all locales
export const seedCollection = async <TSlug extends CollectionSlug>({
  payload,
  collection,
  generator,
  context,
}: {
  payload: Payload
  collection: TSlug
  generator: (args: { context: unknown; locale: TypedLocale }) => Record<string, unknown>
  context: unknown
}): Promise<{ id: string | number }> => {
  // First, create with default locale
  const defaultData = generator({ context, locale: DEFAULT_LOCALE })

  const doc = await payload.create({
    collection,
    data: defaultData as never,
    locale: DEFAULT_LOCALE,
    depth: 0,
    context: { disableRevalidate: true },
  })

  // Then update with other locales
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue

    try {
      const localizedData = generator({ context, locale })

      // Skip if data is identical to default
      if (JSON.stringify(localizedData) === JSON.stringify(defaultData)) continue

      await payload.update({
        collection,
        id: doc.id,
        data: localizedData as never,
        locale,
        depth: 0,
        context: { disableRevalidate: true },
      })
    } catch (_error) {
      payload.logger.error(`— ERROR. Failed to add ${locale} locale to ${collection}`)
    }
  }

  return doc
}

// Seed a global with all locales
export const seedGlobal = async <TSlug extends GlobalSlug>({
  payload,
  slug,
  generator,
  context,
}: {
  payload: Payload
  slug: TSlug
  generator: (args: { context: unknown; locale: TypedLocale }) => Record<string, unknown>
  context: unknown
}): Promise<void> => {
  // First, update with default locale
  const defaultData = generator({ context, locale: DEFAULT_LOCALE })

  await payload.updateGlobal({
    slug,
    data: defaultData as never,
    locale: DEFAULT_LOCALE,
    context: { disableRevalidate: true },
  })

  // Then update with other locales
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue

    try {
      const localizedData = generator({ context, locale })

      // Skip if data is identical to default
      if (JSON.stringify(localizedData) === JSON.stringify(defaultData)) continue

      await payload.updateGlobal({
        slug,
        data: localizedData as never,
        locale,
        context: { disableRevalidate: true },
      })
    } catch (_error) {
      payload.logger.error(`— ERROR. Failed to add ${locale} locale to global ${slug}`)
    }
  }
}
```

**Important Notes:**
- Update `LOCALES` and `DEFAULT_LOCALE` to match your project's i18n config
- Update the `Translations` type to include all your locales
- If you don't have i18n, simplify this to just create/update without locale handling

## Step 2: Create Generator Files for Each Collection

For each collection you want to seed, create a generator file. Each generator is a function that returns data for a specific locale.

### Example: Products Collection (`products.ts`)

```typescript
import type { TypedLocale } from 'payload'
import type { Media, Category } from '@/payload-types'  // Import your generated types
import { translate } from './utils'

// Define what context the generator needs (related docs, images, etc.)
export type ProductContext = {
  image: Media
  category?: Category
}

// Generator for Product 1
export const product1Generator = ({
  context,
  locale,
}: {
  context: ProductContext
  locale: TypedLocale
}) => {
  const { image, category } = context

  return {
    slug: 'product-one',           // Non-localized field
    _status: 'published',          // For versioned collections
    title: translate(              // Localized field
      {
        en: 'Product One',
        ar: 'المنتج الأول',
        fr: 'Produit Un',
      },
      locale,
    ),
    description: translate(
      {
        en: 'Description in English...',
        ar: 'الوصف بالعربية...',
        fr: 'Description en français...',
      },
      locale,
    ),
    price: 99.99,                  // Non-localized field
    image: image.id,               // Relationship field (use ID)
    category: category?.id,        // Optional relationship
    publishedAt: new Date().toISOString(),
  }
}

// Generator for Product 2
export const product2Generator = ({
  context,
  locale,
}: {
  context: ProductContext
  locale: TypedLocale
}) => {
  // ... similar pattern
}
```

### Example: Simple Collection Without Relationships (`categories.ts`)

```typescript
import type { TypedLocale } from 'payload'
import { translate } from './utils'

export const category1Generator = ({
  locale,
}: {
  context: unknown
  locale: TypedLocale
}) => {
  return {
    slug: 'electronics',
    title: translate(
      {
        en: 'Electronics',
        ar: 'إلكترونيات',
        fr: 'Électronique',
      },
      locale,
    ),
  }
}
```

### Example: Non-Localized Collection (`technologies.ts`)

For collections without i18n, just export static data:

```typescript
export const technologiesData = [
  { name: 'React' },
  { name: 'Next.js' },
  { name: 'TypeScript' },
]
```

### Example: Global (`homepage.ts`)

```typescript
import type { TypedLocale } from 'payload'
import type { Media } from '@/payload-types'
import { translate } from './utils'

export type HomepageContext = {
  heroImage: Media
}

export const homepageGenerator = ({
  context,
  locale,
}: {
  context: HomepageContext
  locale: TypedLocale
}) => {
  const { heroImage } = context

  return {
    title: translate(
      {
        en: 'Welcome to Our Store',
        ar: 'مرحباً بكم في متجرنا',
        fr: 'Bienvenue dans Notre Boutique',
      },
      locale,
    ),
    heroSection: {
      heading: translate(
        {
          en: 'Shop the Latest',
          ar: 'تسوق الأحدث',
          fr: 'Achetez les Dernières Nouveautés',
        },
        locale,
      ),
      image: heroImage.id,
    },
    meta: {
      title: translate(
        {
          en: 'My Store - Home',
          ar: 'متجري - الرئيسية',
          fr: 'Ma Boutique - Accueil',
        },
        locale,
      ),
    },
  }
}
```

## Step 3: Create the Main Seed Orchestrator

Create `src/endpoints/seed/index.ts`:

```typescript
import type { CollectionSlug, Payload, PayloadRequest, File } from 'payload'

import { seedCollection, seedGlobal } from './utils'
import { homepageGenerator, type HomepageContext } from './homepage'
import {
  product1Generator,
  product2Generator,
  type ProductContext,
} from './products'
import { category1Generator } from './categories'
import { technologiesData } from './technologies'

// Collections to clear before seeding (don't include users, media if you want to preserve them)
const collections: CollectionSlug[] = [
  'products',
  'categories',
  'technologies',
]

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  // 1. Clear collections
  payload.logger.info('— Clearing collections...')

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, req, where: {} })),
  )

  // Also clear versions if collections have versioning enabled
  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection]?.config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, req, where: {} })),
  )

  // 2. Seed media (fetch from URL or use local files)
  payload.logger.info('— Seeding media...')

  const [image1Buffer, image2Buffer] = await Promise.all([
    fetchFileByURL('https://example.com/image1.webp'),
    fetchFileByURL('https://example.com/image2.webp'),
  ])

  const [image1Doc, image2Doc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: { alt: 'Product Image 1' },
      file: image1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Product Image 2' },
      file: image2Buffer,
    }),
  ])

  // 3. Seed non-localized collections first (if others depend on them)
  payload.logger.info('— Seeding technologies...')

  const technologyDocs = await Promise.all(
    technologiesData.map((tech) =>
      payload.create({
        collection: 'technologies',
        data: tech,
      }),
    ),
  )

  // 4. Seed categories (needed before products)
  payload.logger.info('— Seeding categories...')

  const category1 = await seedCollection({
    payload,
    collection: 'categories',
    generator: category1Generator as (args: {
      context: unknown
      locale: 'en' | 'ar' | 'fr'
    }) => Record<string, unknown>,
    context: {},
  })

  // 5. Seed products (depend on categories and media)
  payload.logger.info('— Seeding products...')

  await Promise.all([
    seedCollection({
      payload,
      collection: 'products',
      generator: product1Generator as (args: {
        context: unknown
        locale: 'en' | 'ar' | 'fr'
      }) => Record<string, unknown>,
      context: { image: image1Doc, category: category1 } as ProductContext,
    }),
    seedCollection({
      payload,
      collection: 'products',
      generator: product2Generator as (args: {
        context: unknown
        locale: 'en' | 'ar' | 'fr'
      }) => Record<string, unknown>,
      context: { image: image2Doc, category: category1 } as ProductContext,
    }),
  ])

  // 6. Seed globals
  payload.logger.info('— Seeding homepage global...')

  await seedGlobal({
    payload,
    slug: 'homepage',
    generator: homepageGenerator as (args: {
      context: unknown
      locale: 'en' | 'ar' | 'fr'
    }) => Record<string, unknown>,
    context: { heroImage: image1Doc } as HomepageContext,
  })

  payload.logger.info('Database seeded successfully!')
}

// Helper to fetch image files from URLs
async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
```

## Step 4: Create the API Route

Create `src/app/(frontend)/next/seed/route.ts`:

```typescript
import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // Allow up to 60 seconds for seeding

export async function POST(): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Authenticate - only allow logged-in users to seed
  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    // Create a Payload request for transaction support
    const payloadReq = await createLocalReq({ user }, payload)

    await seed({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding database' })
    return new Response('Error seeding database.', { status: 500 })
  }
}
```

## Step 5: Create the Admin UI Button (Optional)

Create `src/components/BeforeDashboard/SeedButton/index.tsx`:

```tsx
'use client'

import React, { Fragment, useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'

const SuccessMessage: React.FC = () => (
  <div>
    Database seeded!{' '}
    <a target="_blank" href="/">
      Visit your website
    </a>
  </div>
)

export const SeedButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (seeded) {
        toast.info('Database already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }

      setLoading(true)

      try {
        toast.promise(
          fetch('/next/seed', { method: 'POST', credentials: 'include' })
            .then((res) => {
              if (res.ok) {
                setSeeded(true)
                return true
              }
              throw new Error('Seed failed')
            }),
          {
            loading: 'Seeding database...',
            success: <SuccessMessage />,
            error: 'An error occurred while seeding.',
          },
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    },
    [loading, seeded],
  )

  return (
    <Fragment>
      <button onClick={handleClick} disabled={loading || seeded}>
        {loading ? 'Seeding...' : seeded ? 'Seeded!' : 'Seed Database'}
      </button>
      {error && <span style={{ color: 'red' }}> Error: {error}</span>}
    </Fragment>
  )
}
```

Then add it to your admin panel in `payload.config.ts`:

```typescript
admin: {
  components: {
    beforeDashboard: ['@/components/BeforeDashboard/SeedButton'],
  },
}
```

## Key Patterns to Remember

### 1. Generator Function Pattern
Each generator receives `context` (related documents) and `locale`, returns the data object:

```typescript
const myGenerator = ({ context, locale }) => ({
  // localized fields use translate()
  title: translate({ en: '...', ar: '...', fr: '...' }, locale),
  // non-localized fields are static
  slug: 'my-slug',
  // relationships use IDs
  image: context.image.id,
})
```

### 2. Seeding Order
Seed in dependency order:
1. Media files first (needed by other collections)
2. "Leaf" collections (categories, tags - no dependencies)
3. Collections that reference others (products reference categories)
4. Globals last (may reference any collection)

### 3. Parallel vs Sequential
- Use `Promise.all()` for independent operations
- Seed sequentially when there are dependencies

### 4. Clearing Data
Clear related collections together to avoid orphaned references:

```typescript
await Promise.all([
  payload.db.deleteMany({ collection: 'products', req, where: {} }),
  payload.db.deleteMany({ collection: 'categories', req, where: {} }),
])
```

### 5. Versioned Collections
Always clear versions too:

```typescript
if (payload.collections[collection]?.config.versions) {
  await payload.db.deleteVersions({ collection, req, where: {} })
}
```

## Adapting for Your Project

1. **Identify your collections** - List all collections you want to seed
2. **Map relationships** - Determine which collections depend on others
3. **Check i18n config** - Update `LOCALES` and `Translations` type in utils.ts
4. **Create generators** - One file per collection with generator functions
5. **Plan the seed order** - Media > independent collections > dependent collections > globals
6. **Add translations** - Fill in the `translate()` calls for each locale
7. **Wire up the route** - Create the API endpoint and optional UI button

## Testing Your Seed

1. Start your dev server: `pnpm dev`
2. Log into the admin panel
3. Either click the seed button or call `POST /next/seed`
4. Check the server logs for progress
5. Verify data in the admin panel
