'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useMotionVariants } from '@/hooks/useReducedMotion'

interface PageTransitionProps {
  children: React.ReactNode
  className?: string
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  // const prefersReducedMotion = useReducedMotion()
  const { fadeIn } = useMotionVariants()

  return (
    <motion.div
      initial={fadeIn.initial}
      animate={fadeIn.animate}
      transition={fadeIn.transition}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default PageTransition
