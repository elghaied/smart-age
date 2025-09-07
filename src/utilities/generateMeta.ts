import type { Metadata } from 'next'

import type { Media, Page, Post, Config, Homepage } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}

export const generateMetaForGlobal = async (args: {
  global: Partial<Homepage> | null
  path?: string
}): Promise<Metadata> => {
  const { global, path = '/' } = args

  // For now, use a fallback approach since the SEO plugin fields aren't generating correctly for globals
  // TODO: Fix SEO plugin field generation for globals
  const ogImage = getImageURL(null) // Use default image for now

  const title = global?.meta?.title
    ? global?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  return {
    description: global?.meta?.description || 'Welcome to our website',
    openGraph: mergeOpenGraph({
      description: global?.meta?.description || 'Welcome to our website',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    title,
  }
}
