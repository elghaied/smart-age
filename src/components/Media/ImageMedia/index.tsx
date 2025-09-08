'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React, { useState } from 'react'

import type { Props as MediaProps } from '../types'

import { cssVariables } from '@/cssVariables'
import { getMediaUrl } from '@/utilities/getMediaUrl'

const { breakpoints } = cssVariables

// Enhanced placeholder with teal theme
const placeholderBlur =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJva2xjaCgwLjk2IDAuMDIgMjAwKSIvPgo8Y2lyY2xlIGN4PSIyMDAiIGN5PSIxNTAiIHI9IjQwIiBmaWxsPSJva2xjaCgwLjY1IDAuMTIgMjAwKSIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPHN2Zz4K'

export const ImageMedia: React.FC<MediaProps> = (props) => {
  const {
    alt: altFromProps,
    fill,
    pictureClassName,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
    onLoad,
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ''

  if (!src && resource && typeof resource === 'object') {
    const { alt: altFromResource, height: fullHeight, url, width: fullWidth } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ''

    const cacheTag = resource.updatedAt

    src = getMediaUrl(url, cacheTag)
  }

  const loading = loadingFromProps || (!priority ? 'lazy' : undefined)

  // Enhanced responsive sizes with better breakpoint handling
  const sizes = sizeFromProps
    ? sizeFromProps
    : Object.entries(breakpoints)
        .map(([, value]) => `(max-width: ${value}px) ${Math.min(value, 800)}px`)
        .join(', ')

  const handleLoad = () => {
    setIsLoading(false)
    setHasError(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  // Error fallback component
  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted border border-border rounded-lg',
          'min-h-[200px] text-muted-foreground',
          pictureClassName,
        )}
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-destructive"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <p className="text-sm font-medium">Failed to load image</p>
          <p className="text-xs text-muted-foreground">{alt || 'Image could not be displayed'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', pictureClassName)}>
      {/* Loading state overlay */}
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 z-10 flex items-center justify-center',
            'bg-muted/50 backdrop-blur-sm transition-opacity duration-300',
          )}
        >
          <div className="flex items-center space-x-2 text-muted-foreground">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Loading...</span>
          </div>
        </div>
      )}

      <picture className="block">
        <NextImage
          alt={alt || ''}
          className={cn(
            'transition-all duration-300 ease-in-out',
            {
              'opacity-0': isLoading,
              'opacity-100': !isLoading,
              'scale-105 hover:scale-100': !isLoading && !fill,
            },
            imgClassName,
          )}
          fill={fill}
          height={!fill ? height : undefined}
          placeholder="blur"
          blurDataURL={placeholderBlur}
          priority={priority}
          quality={90}
          loading={loading}
          sizes={sizes}
          src={src}
          width={!fill ? width : undefined}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            objectFit: fill ? 'cover' : undefined,
            objectPosition: 'center',
          }}
        />
      </picture>

      {/* Caption overlay for images with alt text */}
      {alt && !isLoading && !hasError && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <p className="text-white text-sm font-medium line-clamp-2">{alt}</p>
        </div>
      )}
    </div>
  )
}
