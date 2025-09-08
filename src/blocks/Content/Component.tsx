import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <section className="space-section-md">
      <div className="container-layout">
        <div className="grid grid-cols-4 lg:grid-cols-12 gap-content lg:gap-component">
          {columns &&
            columns.length > 0 &&
            columns.map((col, index) => {
              const { enableLink, link, richText, size } = col

              return (
                <div
                  className={cn(
                    `col-span-4 lg:col-span-${colsSpanClasses[size!]}`,
                    {
                      'md:col-span-2': size !== 'full',
                    },
                    // Enhanced content column styling
                    'flex flex-col space-content-md',
                  )}
                  key={index}
                >
                  {richText && (
                    <div className="content-rich-text">
                      <RichText
                        data={richText}
                        enableGutter={false}
                        className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent hover:prose-a:underline prose-code:text-accent prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border"
                      />
                    </div>
                  )}

                  {enableLink && (
                    <div className="content-link-wrapper mt-auto pt-4">
                      <CMSLink
                        {...link}
                        className={cn(
                          // Enhanced link styling for content blocks
                          'transition-all duration-200 ease-in-out',
                          // Button-style links get enhanced interactive effects
                          link?.appearance && link.appearance !== 'default'
                            ? 'hover:scale-105 active:scale-95 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                            : '',
                        )}
                      />
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}
