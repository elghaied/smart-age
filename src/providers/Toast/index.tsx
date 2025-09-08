'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { ToastContainer } from '@/components/VisualFeedback'

interface ToastData {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

interface ToastContextType {
  showToast: (toast: Omit<ToastData, 'id'>) => void
  showSuccess: (title: string, message?: string) => void
  showError: (title: string, message?: string) => void
  showWarning: (title: string, message?: string) => void
  showInfo: (title: string, message?: string) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback((toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: ToastData = {
      ...toast,
      id,
      duration: toast.duration ?? 5000,
    }

    setToasts((prev) => [...prev, newToast])
  }, [])

  const showSuccess = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'success', title, message })
    },
    [showToast],
  )

  const showError = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'error', title, message, duration: 7000 })
    },
    [showToast],
  )

  const showWarning = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'warning', title, message, duration: 6000 })
    },
    [showToast],
  )

  const showInfo = useCallback(
    (title: string, message?: string) => {
      showToast({ type: 'info', title, message })
    },
    [showToast],
  )

  const value: ToastContextType = {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    removeToast,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer
        toasts={toasts.map((toast) => ({ ...toast, onClose: removeToast }))}
        onClose={removeToast}
      />
    </ToastContext.Provider>
  )
}

export default ToastProvider
