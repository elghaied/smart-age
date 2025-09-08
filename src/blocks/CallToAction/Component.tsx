import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="container py-16 md:py-20">
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 rounded-2xl border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />

        <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col gap-8 lg:flex-row lg:justify-between lg:items-center">
          {/* Content section */}
          <div className="flex-1 max-w-3xl">
            {richText && (
              <div className="prose prose-lg max-w-none">
                <RichText
                  className="mb-0 [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:lg:text-5xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:md:text-2xl [&_h3]:lg:text-3xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-3 [&_p]:text-base [&_p]:md:text-lg [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4 [&_p:last-child]:mb-0"
                  data={richText}
                  enableGutter={false}
                />
              </div>
            )}
          </div>

          {/* Actions section */}
          {links && links.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 lg:flex-col lg:gap-3 lg:min-w-[200px]">
              {links.map(({ link }, i) => {
                // Primary button for first link, secondary for others
                const appearance = i === 0 ? 'default' : 'outline'
                return (
                  <CMSLink
                    key={i}
                    size="lg"
                    appearance={appearance}
                    className="transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
                    {...link}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
