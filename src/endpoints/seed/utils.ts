import type { CollectionSlug, GlobalSlug, Payload, TypedLocale } from 'payload'

// Define your project's locales - matches src/i18n/localization.ts
export const LOCALES: TypedLocale[] = ['en', 'ar']
export const DEFAULT_LOCALE: TypedLocale = 'en'

// Type helper for translations
export type Translations = {
  en: string
  ar: string
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
