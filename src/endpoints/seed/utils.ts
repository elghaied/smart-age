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

// Helper to merge array IDs from created doc into localized data
// This ensures localized updates target the same array rows, not create new ones
const mergeArrayIds = (
  createdDoc: Record<string, unknown>,
  localizedData: Record<string, unknown>,
): Record<string, unknown> => {
  const result = { ...localizedData }

  for (const key of Object.keys(localizedData)) {
    const localizedValue = localizedData[key]
    const createdValue = createdDoc[key]

    // Check if both are arrays
    if (Array.isArray(localizedValue) && Array.isArray(createdValue)) {
      // Merge IDs from created array items into localized array items
      result[key] = localizedValue.map((item, index) => {
        const createdItem = createdValue[index]
        if (
          createdItem &&
          typeof createdItem === 'object' &&
          'id' in createdItem &&
          typeof item === 'object' &&
          item !== null
        ) {
          return { ...item, id: createdItem.id }
        }
        return item
      })
    }
  }

  return result
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

      // Merge array IDs from created doc to ensure localized updates
      // target the same rows instead of creating new ones
      const mergedData = mergeArrayIds(doc as Record<string, unknown>, localizedData)

      await payload.update({
        collection,
        id: doc.id,
        data: mergedData as never,
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

  const global = await payload.updateGlobal({
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

      // Merge array IDs from created global to ensure localized updates
      // target the same rows instead of creating new ones
      const mergedData = mergeArrayIds(global as Record<string, unknown>, localizedData)

      await payload.updateGlobal({
        slug,
        data: mergedData as never,
        locale,
        context: { disableRevalidate: true },
      })
    } catch (_error) {
      payload.logger.error(`— ERROR. Failed to add ${locale} locale to global ${slug}`)
    }
  }
}
