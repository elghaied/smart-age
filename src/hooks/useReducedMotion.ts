'use client'

import { useEffect, useState } from 'react'

/**
 * Hook to detect user's motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return
    }

    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to get motion-safe animation variants for Framer Motion
 */
export function useMotionVariants() {
  const prefersReducedMotion = useReducedMotion()

  return {
    // Fade in animation
    fadeIn: {
      initial: { opacity: prefersReducedMotion ? 1 : 0 },
      animate: { opacity: 1 },
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: 'easeOut' as const,
      },
    },

    // Slide up animation
    slideUp: {
      initial: {
        opacity: prefersReducedMotion ? 1 : 0,
        y: prefersReducedMotion ? 0 : 20,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      transition: {
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: 'easeOut' as const,
      },
    },

    // Scale animation
    scale: {
      initial: {
        opacity: prefersReducedMotion ? 1 : 0,
        scale: prefersReducedMotion ? 1 : 0.95,
      },
      animate: {
        opacity: 1,
        scale: 1,
      },
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: 'easeOut' as const,
      },
    },

    // Stagger children animation
    stagger: {
      animate: {
        transition: {
          staggerChildren: prefersReducedMotion ? 0 : 0.1,
          delayChildren: prefersReducedMotion ? 0 : 0.2,
        },
      },
    },
  }
}

/**
 * Utility function to get reduced motion safe values
 */
export function getMotionValue<T>(normalValue: T, reducedValue: T, prefersReduced?: boolean): T {
  const shouldReduce =
    prefersReduced ??
    (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  return shouldReduce ? reducedValue : normalValue
}
