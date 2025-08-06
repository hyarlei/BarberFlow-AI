import { useCallback, useState } from 'react'

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    const duration = toast.duration || 5000
    setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  // Helper methods for different toast types
  const success = useCallback((message: string, title?: string, duration?: number) => {
    return addToast({ type: 'success', message, title, duration })
  }, [addToast])

  const error = useCallback((message: string, title?: string, duration?: number) => {
    return addToast({ type: 'error', message, title, duration })
  }, [addToast])

  const warning = useCallback((message: string, title?: string, duration?: number) => {
    return addToast({ type: 'warning', message, title, duration })
  }, [addToast])

  const info = useCallback((message: string, title?: string, duration?: number) => {
    return addToast({ type: 'info', message, title, duration })
  }, [addToast])

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info
  }
}
