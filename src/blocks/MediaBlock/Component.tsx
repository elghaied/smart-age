import type { StaticImageData } from 'next/image'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (media && typeof media === 'object') caption = media.caption

  return (
    <div
      className={cn(
        'group relative',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <div className="relative overflow-hidden rounded-xl bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
          {/* Enhanced media container with hover effects */}
          <div className="relative overflow-hidden rounded-xl">
            <Media
              imgClassName={cn(
                'w-full h-auto object-cover transition-all duration-500 ease-out',
                'group-hover:scale-105',
                'border border-border/50',
                imgClassName,
              )}
              resource={media}
              src={staticImage}
            />

            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Decorative border accent */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-border/20 transition-all duration-300 group-hover:ring-primary/30" />
          </div>
        </div>
      )}

      {caption && (
        <div
          className={cn(
            'mt-6 space-y-2',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          {/* Enhanced caption styling with better typography */}
          <div className="prose prose-sm max-w-none">
            <div className="text-muted-foreground text-sm leading-relaxed">
              <RichText data={caption} enableGutter={false} />
            </div>
          </div>

          {/* Subtle accent line */}
          <div className="w-12 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        </div>
      )}
    </div>
  )
}
