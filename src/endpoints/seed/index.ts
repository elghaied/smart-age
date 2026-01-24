import type { CollectionSlug, Payload, PayloadRequest } from 'payload'

import { seedCollection, seedGlobal } from './utils'
import { valueGenerators } from './values'
import { serviceGenerators } from './services'
import { projectGenerators } from './projects'
import { goalGenerators } from './goals'
import { featureGenerators } from './features'
import { teamMemberGenerators } from './team-members'
import { homepageGenerator } from './homepage'
import { siteSettingsGenerator } from './site-settings'
import { headerGenerator } from './header'
import { footerGenerator } from './footer'

// Collections to clear before seeding (don't include users, media, pages, posts, categories)
const collections: CollectionSlug[] = [
  'values',
  'services',
  'projects',
  'goals',
  'features',
  'team-members',
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

  // 2. Seed Values
  payload.logger.info('— Seeding values...')
  for (const generator of valueGenerators) {
    await seedCollection({
      payload,
      collection: 'values',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 3. Seed Services
  payload.logger.info('— Seeding services...')
  for (const generator of serviceGenerators) {
    await seedCollection({
      payload,
      collection: 'services',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 4. Seed Projects
  payload.logger.info('— Seeding projects...')
  for (const generator of projectGenerators) {
    await seedCollection({
      payload,
      collection: 'projects',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 5. Seed Goals
  payload.logger.info('— Seeding goals...')
  for (const generator of goalGenerators) {
    await seedCollection({
      payload,
      collection: 'goals',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 6. Seed Features
  payload.logger.info('— Seeding features...')
  for (const generator of featureGenerators) {
    await seedCollection({
      payload,
      collection: 'features',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 7. Seed Team Members
  payload.logger.info('— Seeding team members...')
  for (const generator of teamMemberGenerators) {
    await seedCollection({
      payload,
      collection: 'team-members',
      generator: generator as (args: {
        context: unknown
        locale: 'en' | 'ar'
      }) => Record<string, unknown>,
      context: {},
    })
  }

  // 8. Seed Globals
  payload.logger.info('— Seeding homepage global...')
  await seedGlobal({
    payload,
    slug: 'homepage',
    generator: homepageGenerator as (args: {
      context: unknown
      locale: 'en' | 'ar'
    }) => Record<string, unknown>,
    context: {},
  })

  // Note: contact-info requires a form relationship, so skip seeding it
  // You can manually configure contact-info in the admin panel after creating a form

  payload.logger.info('— Seeding site-settings global...')
  await seedGlobal({
    payload,
    slug: 'site-settings',
    generator: siteSettingsGenerator as (args: {
      context: unknown
      locale: 'en' | 'ar'
    }) => Record<string, unknown>,
    context: {},
  })

  payload.logger.info('— Seeding header global...')
  await seedGlobal({
    payload,
    slug: 'header',
    generator: headerGenerator as (args: {
      context: unknown
      locale: 'en' | 'ar'
    }) => Record<string, unknown>,
    context: {},
  })

  payload.logger.info('— Seeding footer global...')
  await seedGlobal({
    payload,
    slug: 'footer',
    generator: footerGenerator as (args: {
      context: unknown
      locale: 'en' | 'ar'
    }) => Record<string, unknown>,
    context: {},
  })

  payload.logger.info('Database seeded successfully!')
}
