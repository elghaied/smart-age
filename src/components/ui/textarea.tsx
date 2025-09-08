import { cn } from '@/utilities/ui'
import * as React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: React.Ref<HTMLTextAreaElement>
  error?: boolean
  success?: boolean
}

const Textarea: React.FC<TextareaProps> = ({
  className,
  ref,
  error = false,
  success = false,
  ...props
}) => {
  const baseClasses = cn(
    'flex min-h-[80px] w-full rounded border bg-input px-3 py-2 text-sm ring-offset-background transition-all duration-200 ease-in-out',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50 resize-vertical',
    'focus:scale-[1.01]',
    // Default state
    'border-border hover:border-accent/30 focus-visible:ring-ring focus-visible:border-accent/50',
    // Error state
    error && 'border-destructive focus-visible:ring-destructive hover:border-destructive/50',
    // Success state
    success && 'border-green-500 focus-visible:ring-green-500 hover:border-green-400',
    className,
  )

  return <textarea className={baseClasses} ref={ref} {...props} />
}

export { Textarea }
