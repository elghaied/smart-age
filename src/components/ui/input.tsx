import { cn } from '@/utilities/ui'
import * as React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  ref?: React.Ref<HTMLInputElement>
  error?: boolean
  success?: boolean
}

const Input: React.FC<InputProps> = ({
  type,
  className,
  ref,
  error = false,
  success = false,
  ...props
}) => {
  const baseClasses = cn(
    'flex h-10 w-full rounded border bg-input px-3 py-2 text-sm ring-offset-background transition-all duration-200 ease-in-out',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus:scale-[1.01]',
    // Default state
    'border-border hover:border-accent/30 focus-visible:ring-ring focus-visible:border-accent/50',
    // Error state
    error && 'border-destructive focus-visible:ring-destructive hover:border-destructive/50',
    // Success state
    success && 'border-green-500 focus-visible:ring-green-500 hover:border-green-400',
    className,
  )

  return <input className={baseClasses} ref={ref} type={type} {...props} />
}

export { Input }
