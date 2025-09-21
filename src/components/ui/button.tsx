'use client'

import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import { LoadingSpinner } from '@/components/LoadingState'
import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden hover:scale-105 active:scale-95',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded px-8',
        sm: 'h-9 rounded px-3',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm hover:shadow-md',
        ghost:
          'hover:bg-accent/10 hover:text-accent-foreground border border-transparent hover:border-accent/20',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline hover:scale-100 active:scale-100',
        outline:
          'border border-border bg-background hover:bg-accent/5 hover:text-accent-foreground hover:border-accent/30 shadow-sm hover:shadow-md',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm hover:shadow-md',
      },
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      className,
      size,
      variant,
      loading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    const isDisabled = disabled || loading

    const content = (
      <span className="inline-flex items-center">
        {loading && (
          <LoadingSpinner
            size={size === 'sm' ? 'sm' : size === 'lg' ? 'md' : 'sm'}
            className="mr-2"
          />
        )}
        <span>{loading && loadingText ? loadingText : children}</span>
      </span>
    )

    return (
      <Comp
        className={cn(buttonVariants({ size, variant }), className)}
        ref={ref}
        // ✅ Only apply disabled to real buttons
        {...(!asChild && { disabled: isDisabled })}
        // ✅ For a11y: still show disabled state on links/divs
        {...(asChild && isDisabled ? { 'aria-disabled': true } : {})}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
