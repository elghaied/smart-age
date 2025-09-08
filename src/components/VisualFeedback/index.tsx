'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utilities/ui'
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react'

interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  onClose: (id: string) => void
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800',
}

export const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}) => {
  const prefersReducedMotion = useReducedMotion()
  const Icon = iconMap[type]

  React.useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: 300, scale: 0.95 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 300, scale: 0.95 },
        transition: {
          type: 'spring' as const,
          stiffness: 500,
          damping: 30,
        },
      }

  return (
    <motion.div
      className={cn(
        'flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm',
        colorMap[type],
      )}
      {...animationProps}
    >
      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm">{title}</h4>
        {message && <p className="text-sm opacity-90 mt-1">{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 p-1 rounded hover:bg-black/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

// Toast container
interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}

// Ripple effect for button clicks
interface RippleProps {
  x: number
  y: number
  size: number
}

export const Ripple: React.FC<RippleProps> = ({ x, y, size }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.span
      className="absolute bg-white/30 rounded-full pointer-events-none"
      style={{
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
      }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: 2, opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' as const }}
    />
  )
}

// Hook for managing ripple effects
export const useRipple = () => {
  const [ripples, setRipples] = React.useState<RippleProps[]>([])

  const createRipple = React.useCallback((event: React.MouseEvent<HTMLElement>) => {
    const element = event.currentTarget
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple: RippleProps = {
      x,
      y,
      size,
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.slice(1))
    }, 600)
  }, [])

  return { ripples, createRipple }
}

// Pulse animation for loading states
interface PulseProps {
  className?: string
  children?: React.ReactNode
}

export const Pulse: React.FC<PulseProps> = ({ className, children }) => {
  const prefersReducedMotion = useReducedMotion()

  const animationProps = prefersReducedMotion
    ? {}
    : {
        animate: {
          opacity: [0.5, 1, 0.5],
        },
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
        },
      }

  return (
    <motion.div className={className} {...animationProps}>
      {children}
    </motion.div>
  )
}

export default Toast
