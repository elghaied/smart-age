'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utilities/ui'

interface LoadingStateProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export const LoadingSpinner: React.FC<LoadingStateProps> = ({ size = 'md', className, text }) => {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <motion.div
        className={cn(
          'border-2 border-primary/20 border-t-primary rounded-full',
          sizeClasses[size],
        )}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 1,
                repeat: Infinity,
                ease: 'linear',
              }
        }
      />
      {text && <span className={cn('text-muted-foreground', textSizeClasses[size])}>{text}</span>}
    </div>
  )
}

export const LoadingDots: React.FC<LoadingStateProps> = ({ size = 'md', className }) => {
  const prefersReducedMotion = useReducedMotion()

  const dotSizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  }

  const dots = [0, 1, 2]

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      {dots.map((index) => (
        <motion.div
          key={index}
          className={cn('bg-primary rounded-full', dotSizeClasses[size])}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }
          }
          transition={
            prefersReducedMotion
              ? {}
              : {
                  duration: 1.2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  )
}

export const LoadingPulse: React.FC<LoadingStateProps> = ({ size = 'md', className }) => {
  const prefersReducedMotion = useReducedMotion()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <motion.div
        className={cn('bg-primary/20 rounded-full', sizeClasses[size])}
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }
        }
        transition={
          prefersReducedMotion
            ? {}
            : {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      />
    </div>
  )
}

// Main loading state component
export const LoadingState: React.FC<
  LoadingStateProps & {
    variant?: 'spinner' | 'dots' | 'pulse'
  }
> = ({ variant = 'spinner', ...props }) => {
  switch (variant) {
    case 'dots':
      return <LoadingDots {...props} />
    case 'pulse':
      return <LoadingPulse {...props} />
    default:
      return <LoadingSpinner {...props} />
  }
}

export default LoadingState
