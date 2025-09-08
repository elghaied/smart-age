'use client'

import { cn } from '@/utilities/ui'
import * as React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>
  interactive?: boolean
  loading?: boolean
}

const Card: React.FC<CardProps> = ({
  className,
  ref,
  interactive = false,
  loading = false,
  ...props
}) => {
  const cardClassName = cn(
    'rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all duration-200 ease-in-out',
    interactive &&
      'hover:shadow-md hover:border-accent/20 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]',
    loading && 'opacity-60 pointer-events-none',
    className,
  )

  return <div className={cardClassName} ref={ref} {...props} />
}

const CardHeader: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
)

const CardTitle: React.FC<
  { ref?: React.Ref<HTMLHeadingElement> } & React.HTMLAttributes<HTMLHeadingElement>
> = ({ className, ref, ...props }) => (
  <h3
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    ref={ref}
    {...props}
  />
)

const CardDescription: React.FC<
  { ref?: React.Ref<HTMLParagraphElement> } & React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ref, ...props }) => (
  <p className={cn('text-sm text-muted-foreground', className)} ref={ref} {...props} />
)

const CardContent: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
)

const CardFooter: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
)

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
