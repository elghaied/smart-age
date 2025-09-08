import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { cn } from '@/utilities/ui'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end min-h-[85vh] overflow-hidden">
      {/* Enhanced content overlay */}
      <div
        className={cn(
          'container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-12',
          'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-6 motion-safe:duration-1000',
        )}
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          {/* Enhanced category badges */}
          {categories && categories.length > 0 && (
            <div
              className={cn(
                'flex flex-wrap gap-2 mb-6',
                'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
                'motion-safe:duration-700 motion-safe:delay-200',
              )}
            >
              {categories.map((category, index) => {
                if (typeof category === 'object' && category !== null) {
                  const { title: categoryTitle } = category
                  const titleToUse = categoryTitle || 'Untitled category'

                  return (
                    <span
                      key={index}
                      className={cn(
                        'inline-flex items-center px-3 py-1',
                        'bg-primary/20 backdrop-blur-sm',
                        'border border-primary/30 rounded-full',
                        'text-xs font-medium uppercase tracking-wider',
                        'text-white/90 hover:text-white',
                        'transition-colors duration-200',
                      )}
                    >
                      {titleToUse}
                    </span>
                  )
                }
                return null
              })}
            </div>
          )}

          {/* Enhanced title */}
          <div
            className={cn(
              'mb-8',
              'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
              'motion-safe:duration-700 motion-safe:delay-300',
            )}
          >
            <h1
              className={cn(
                'text-display-lg font-bold text-white leading-tight',
                'drop-shadow-lg',
                'max-w-4xl',
              )}
            >
              {title}
            </h1>
          </div>

          {/* Enhanced metadata */}
          <div
            className={cn(
              'flex flex-col sm:flex-row gap-6 sm:gap-12',
              'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4',
              'motion-safe:duration-700 motion-safe:delay-500',
            )}
          >
            {hasAuthors && (
              <div
                className={cn(
                  'flex flex-col gap-2',
                  'bg-black/20 backdrop-blur-sm rounded-lg p-4',
                  'border border-white/10',
                )}
              >
                <p className="text-sm font-medium text-white/70 uppercase tracking-wide">Author</p>
                <p className="text-base font-semibold text-white">
                  {formatAuthors(populatedAuthors)}
                </p>
              </div>
            )}
            {publishedAt && (
              <div
                className={cn(
                  'flex flex-col gap-2',
                  'bg-black/20 backdrop-blur-sm rounded-lg p-4',
                  'border border-white/10',
                )}
              >
                <p className="text-sm font-medium text-white/70 uppercase tracking-wide">
                  Published
                </p>
                <time dateTime={publishedAt} className="text-base font-semibold text-white">
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced background with better overlay */}
      <div className="absolute inset-0 min-h-[85vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-20 object-cover" resource={heroImage} />
        )}
        {/* Enhanced gradient overlays for better readability */}
        <div
          className={cn(
            'absolute inset-0 -z-10',
            'bg-gradient-to-t from-black/80 via-black/40 to-black/20',
          )}
        />
        <div
          className={cn(
            'absolute inset-0 -z-10',
            'bg-gradient-to-br from-primary/20 via-transparent to-accent/10',
          )}
        />
        {/* Additional overlay for text area */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 h-2/3 -z-10',
            'bg-gradient-to-t from-black/90 via-black/50 to-transparent',
          )}
        />
      </div>
    </div>
  )
}
