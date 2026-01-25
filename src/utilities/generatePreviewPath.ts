import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  careers: '/careers',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  locale: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug, locale }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `/${locale}${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
