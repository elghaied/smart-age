import React from 'react'

import type { Page } from '@/payload-types'

import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'

type LowImpactHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const LowImpactHero: React.FC<LowImpactHeroType> = ({ children, richText }) => {
  return (
    <div
      className={cn(
        'container space-section-sm',
        'motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-500',
      )}
    >
      <div
        className={cn(
          'max-w-4xl mx-auto',
          'bg-card/50 backdrop-blur-sm',
          'border border-border/50 rounded-xl',
          'p-8 md:p-12',
          'shadow-sm hover:shadow-md transition-shadow duration-300',
        )}
      >
        <div
          className={cn(
            'prose prose-lg max-w-none',
            '[&_h1]:text-display-sm [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-6',
            '[&_h2]:heading-2 [&_h2]:text-foreground [&_h2]:mb-4',
            '[&_h3]:heading-3 [&_h3]:text-foreground [&_h3]:mb-3',
            '[&_p]:text-base [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4',
            '[&_p:last-child]:mb-0',
            '[&_strong]:text-foreground [&_strong]:font-semibold',
            '[&_em]:text-muted-foreground',
            '[&_a]:text-primary [&_a]:font-medium [&_a]:no-underline',
            '[&_a:hover]:text-accent [&_a:hover]:underline [&_a:hover]:underline-offset-4',
            '[&_ul]:space-y-2 [&_ol]:space-y-2',
            '[&_li]:text-muted-foreground [&_li]:leading-relaxed',
            '[&_blockquote]:border-l-4 [&_blockquote]:border-primary',
            '[&_blockquote]:bg-muted/30 [&_blockquote]:p-4 [&_blockquote]:rounded-r-lg',
            '[&_blockquote]:text-muted-foreground [&_blockquote]:italic',
            '[&_code]:bg-muted [&_code]:text-accent [&_code]:px-2 [&_code]:py-1',
            '[&_code]:rounded [&_code]:text-sm [&_code]:font-mono',
          )}
        >
          {children || (richText && <RichText data={richText} enableGutter={false} />)}
        </div>
      </div>
    </div>
  )
}
