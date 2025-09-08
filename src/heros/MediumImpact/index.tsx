import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="space-section-md">
      {/* Content section with enhanced styling */}
      <div className="container space-content-lg">
        <div
          className={cn(
            'max-w-4xl mx-auto text-center',
            'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700',
          )}
        >
          {richText && (
            <div
              className={cn(
                'mb-8 space-content-lg',
                '[&_h1]:text-display-md [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6',
                '[&_h2]:text-display-sm [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-4',
                '[&_p]:text-lg [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4',
                '[&_p]:max-w-3xl [&_p]:mx-auto',
              )}
            >
              <RichText data={richText} enableGutter={false} />
            </div>
          )}

          {Array.isArray(links) && links.length > 0 && (
            <div
              className={cn(
                'flex flex-col sm:flex-row justify-center gap-4',
                'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
                'motion-safe:duration-700 motion-safe:delay-200',
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
                        'px-6 py-3 text-base font-semibold',
                        i === 0
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                        'shadow-sm hover:shadow-md',
                        'rounded-lg transition-all duration-200 ease-in-out',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                      )}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Enhanced media section */}
      <div className="container space-content-lg">
        {media && typeof media === 'object' && (
          <div
            className={cn(
              'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
              'motion-safe:duration-700 motion-safe:delay-400',
            )}
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-xl',
                'shadow-lg hover:shadow-xl transition-shadow duration-300',
                'bg-card border border-border',
              )}
            >
              <Media
                className="-mx-4 md:-mx-8 2xl:-mx-16"
                imgClassName="transition-transform duration-300 hover:scale-105"
                priority
                resource={media}
              />
              {/* Subtle overlay for better integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none" />
            </div>
            {media?.caption && (
              <div className={cn('mt-4 text-center', 'text-sm text-muted-foreground')}>
                <RichText
                  data={media.caption}
                  enableGutter={false}
                  className="[&_p]:text-sm [&_p]:text-muted-foreground [&_p]:mb-0"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
