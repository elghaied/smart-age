'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion, useMotionVariants } from '@/hooks/useReducedMotion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  animation?: 'fadeIn' | 'slideUp' | 'scale'
}

export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  className,
  delay = 0,
  animation = 'slideUp',
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px 0px -100px 0px', // Trigger animation when section is 100px from viewport
  })
  const prefersReducedMotion = useReducedMotion()
  const motionVariants = useMotionVariants()

  const selectedVariant = motionVariants[animation]

  // If reduced motion is preferred, just return the children without animation
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      initial={selectedVariant.initial}
      animate={isInView ? selectedVariant.animate : selectedVariant.initial}
      transition={{
        ...selectedVariant.transition,
        delay: delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default SectionTransition
