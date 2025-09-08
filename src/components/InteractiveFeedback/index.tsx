'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utilities/ui'

interface InteractiveFeedbackProps {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  tapScale?: number
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
}

export const InteractiveFeedback: React.FC<InteractiveFeedbackProps> = ({
  children,
  className,
  hoverScale = 1.02,
  tapScale = 0.98,
  disabled = false,
  loading = false,
  onClick,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const motionProps = prefersReducedMotion
    ? {}
    : {
        whileHover: disabled || loading ? {} : { scale: hoverScale },
        whileTap: disabled || loading ? {} : { scale: tapScale },
        transition: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 17,
        },
      }

  return (
    <motion.div
      className={cn(
        'cursor-pointer transition-colors duration-200',
        (disabled || loading) && 'cursor-not-allowed opacity-60',
        className,
      )}
      onClick={disabled || loading ? undefined : onClick}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

// Specialized feedback for buttons
export const ButtonFeedback: React.FC<InteractiveFeedbackProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <InteractiveFeedback
      className={cn(
        'inline-flex items-center justify-center rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      )}
      hoverScale={1.05}
      tapScale={0.95}
      {...props}
    >
      {children}
    </InteractiveFeedback>
  )
}

// Specialized feedback for cards
export const CardFeedback: React.FC<InteractiveFeedbackProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <InteractiveFeedback
      className={cn(
        'rounded-lg transition-shadow duration-200',
        'hover:shadow-md focus-within:shadow-md',
        className,
      )}
      hoverScale={1.01}
      tapScale={0.99}
      {...props}
    >
      {children}
    </InteractiveFeedback>
  )
}

// Specialized feedback for links
export const LinkFeedback: React.FC<InteractiveFeedbackProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <InteractiveFeedback
      className={cn(
        'inline-block transition-colors duration-200',
        'hover:text-primary focus-visible:text-primary',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
        className,
      )}
      hoverScale={1.01}
      tapScale={0.99}
      {...props}
    >
      {children}
    </InteractiveFeedback>
  )
}

export default InteractiveFeedback
