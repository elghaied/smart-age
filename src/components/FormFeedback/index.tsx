'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utilities/ui'
import { CheckCircle, AlertCircle, XCircle, Info } from 'lucide-react'

interface FormFeedbackProps {
  type?: 'success' | 'error' | 'warning' | 'info'
  message?: string
  visible?: boolean
  className?: string
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: 'text-green-600 bg-green-50 border-green-200',
  error: 'text-red-600 bg-red-50 border-red-200',
  warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  info: 'text-blue-600 bg-blue-50 border-blue-200',
}

export const FormFeedback: React.FC<FormFeedbackProps> = ({
  type = 'info',
  message,
  visible = true,
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const Icon = iconMap[type]

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: -10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.95 },
        transition: {
          type: 'spring' as const,
          stiffness: 500,
          damping: 30,
        },
      }

  return (
    <AnimatePresence>
      {visible && message && (
        <motion.div
          className={cn(
            'flex items-center gap-2 p-3 rounded-md border text-sm',
            colorMap[type],
            className,
          )}
          {...animationProps}
        >
          <Icon className="w-4 h-4 flex-shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Form field wrapper with enhanced feedback
interface FormFieldProps {
  children: React.ReactNode
  label?: string
  error?: string
  success?: string
  required?: boolean
  className?: string
}

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  success,
  required = false,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      {children}
      <FormFeedback
        type={error ? 'error' : success ? 'success' : undefined}
        message={error || success}
        visible={!!(error || success)}
      />
    </div>
  )
}

// Loading overlay for forms
interface FormLoadingOverlayProps {
  visible: boolean
  message?: string
  className?: string
}

export const FormLoadingOverlay: React.FC<FormLoadingOverlayProps> = ({
  visible,
  message = 'Submitting...',
  className,
}) => {
  const prefersReducedMotion = useReducedMotion()

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.2 },
      }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(
            'absolute inset-0 bg-background/80 backdrop-blur-sm',
            'flex items-center justify-center z-10',
            'rounded-lg',
            className,
          )}
          {...animationProps}
        >
          <div className="flex items-center gap-3 bg-card p-4 rounded-lg shadow-lg border">
            <motion.div
              className="w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full"
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
            <span className="text-sm font-medium">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default FormFeedback
