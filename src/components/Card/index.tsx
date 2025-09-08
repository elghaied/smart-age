'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative bg-card border border-border rounded-xl overflow-hidden',
        'shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 ease-in-out',
        'hover:cursor-pointer hover:border-primary/30 hover:-translate-y-1',
        'focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2',
        'motion-safe:hover:scale-[1.02] motion-safe:active:scale-[0.98]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
        {!metaImage && (
          <div className="flex items-center justify-center h-full bg-gradient-to-br from-muted via-muted/80 to-muted/60">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="text-muted-foreground text-sm font-medium">No image</div>
            </div>
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <div className="relative w-full h-full">
            <Media
              resource={metaImage}
              size="33vw"
              imgClassName="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Reading time indicator (if available) */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
            <span className="text-white text-xs font-medium">Read more</span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {showCategories && hasCategories && (
          <div className="flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                const categoryTitle = titleFromCategory || 'Untitled category'

                return (
                  <span
                    key={index}
                    className={cn(
                      'inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold',
                      'bg-primary/10 text-primary border border-primary/20',
                      'group-hover:bg-primary/15 group-hover:border-primary/30',
                      'transition-colors duration-200',
                    )}
                  >
                    {categoryTitle}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}

        {titleToUse && (
          <h3 className="text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-200">
            <Link
              href={href}
              ref={link.ref}
              className={cn(
                'hover:no-underline focus:outline-none focus:ring-2 focus:ring-primary/20',
                'focus:ring-offset-2 rounded-sm block',
              )}
            >
              {titleToUse}
            </Link>
          </h3>
        )}

        {description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 group-hover:text-foreground/80 transition-colors duration-200">
            {sanitizedDescription}
          </p>
        )}

        {/* Read more indicator */}
        <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <span>Read more</span>
          <svg
            className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>

      {/* Enhanced accent border with gradient */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </article>
  )
}
