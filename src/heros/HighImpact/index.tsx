'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className={cn(
        'relative -mt-[10.4rem] flex items-center justify-center text-white',
        'min-h-[100vh] overflow-hidden',
      )}
      data-theme="dark"
    >
      {/* Content overlay with enhanced styling */}
      <div className="container mb-8 z-10 relative flex items-center justify-center">
        <div
          className={cn(
            'max-w-[48rem] md:text-center',
            'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-1000',
          )}
        >
          {richText && (
            <div
              className={cn(
                'mb-8 space-content-lg',
                '[&_h1]:text-display-lg [&_h1]:font-bold [&_h1]:text-white [&_h1]:mb-6',
                '[&_h2]:text-display-md [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mb-4',
                '[&_p]:text-xl [&_p]:text-white/90 [&_p]:leading-relaxed [&_p]:mb-4',
                '[&_p]:max-w-2xl [&_p]:mx-auto',
              )}
            >
              <RichText data={richText} enableGutter={false} />
            </div>
          )}
          {Array.isArray(links) && links.length > 0 && (
            <div
              className={cn(
                'flex flex-col sm:flex-row md:justify-center gap-4',
                'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
                'motion-safe:duration-1000 motion-safe:delay-300',
              )}
            >
              {links.map(({ link }, i) => {
                return (
                  <div
                    key={i}
                    className={cn(
                      'transition-all duration-200 ease-in-out',
                      'hover:scale-105 active:scale-95',
                    )}
                  >
                    <CMSLink
                      {...link}
                      className={cn(
                        'inline-flex items-center justify-center',
                        'px-8 py-4 text-lg font-semibold',
                        'bg-primary text-primary-foreground',
                        'hover:bg-primary/90 shadow-lg hover:shadow-xl',
                        'rounded-lg transition-all duration-200 ease-in-out',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                        'focus-visible:ring-offset-transparent',
                        i === 0 ? 'bg-white text-primary hover:bg-white/90' : '',
                      )}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced background media with overlay */}
      <div className="absolute inset-0 min-h-[100vh] select-none">
        {media && typeof media === 'object' && (
          <Media fill imgClassName="-z-20 object-cover" priority resource={media} />
        )}
        {/* Enhanced gradient overlay for better text readability */}
        <div
          className={cn(
            'absolute inset-0 -z-10',
            'bg-gradient-to-b from-black/40 via-black/20 to-black/60',
            'backdrop-blur-[0.5px]',
          )}
        />
        {/* Subtle teal accent overlay */}
        <div
          className={cn(
            'absolute inset-0 -z-10',
            'bg-gradient-to-br from-primary/10 via-transparent to-accent/5',
          )}
        />
      </div>
    </div>
  )
}
