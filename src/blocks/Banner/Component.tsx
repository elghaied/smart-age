import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn(
          'border rounded-lg transition-all duration-200 ease-in-out',
          'shadow-sm hover:shadow-md',
          'space-component-sm',
          'relative overflow-hidden',
          {
            // Info style - Primary teal theme
            'border-primary/20 bg-primary/5 text-foreground': style === 'info',
            // Error style - Red theme with teal accents
            'border-destructive/30 bg-destructive/10 text-destructive-foreground':
              style === 'error',
            // Success style - Green theme with teal accents
            'border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-300':
              style === 'success',
            // Warning style - Orange theme with teal accents
            'border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300':
              style === 'warning',
          },
        )}
      >
        {/* Subtle accent border for enhanced visual appeal */}
        <div
          className={cn('absolute left-0 top-0 h-full w-1 rounded-l-lg', {
            'bg-primary': style === 'info',
            'bg-destructive': style === 'error',
            'bg-green-500': style === 'success',
            'bg-orange-500': style === 'warning',
          })}
        />

        {/* Content container with improved typography */}
        <div className="relative pl-4">
          <div className="content-rich-text">
            <RichText
              data={content}
              enableGutter={false}
              enableProse={false}
              className={cn(
                'text-sm leading-relaxed',
                '[&_h1]:heading-4 [&_h1]:mb-2 [&_h1]:mt-0',
                '[&_h2]:heading-5 [&_h2]:mb-2 [&_h2]:mt-0',
                '[&_h3]:heading-6 [&_h3]:mb-1 [&_h3]:mt-0',
                '[&_p]:mb-2 [&_p]:last:mb-0',
                '[&_strong]:font-semibold',
                '[&_a]:font-medium [&_a]:underline-offset-2',
                '[&_a]:transition-colors [&_a]:duration-200',
                // Style-specific link colors
                {
                  '[&_a]:text-primary [&_a:hover]:text-accent': style === 'info',
                  '[&_a]:text-destructive [&_a:hover]:text-destructive/80': style === 'error',
                  '[&_a]:text-green-600 [&_a:hover]:text-green-700 dark:[&_a]:text-green-400 dark:[&_a:hover]:text-green-300':
                    style === 'success',
                  '[&_a]:text-orange-600 [&_a:hover]:text-orange-700 dark:[&_a]:text-orange-400 dark:[&_a:hover]:text-orange-300':
                    style === 'warning',
                },
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
