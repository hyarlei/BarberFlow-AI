// UI Components exports
export { default as Button } from './Button'
export { default as Card } from './Card'
export { default as Input } from './Input'
export { default as Modal } from './Modal'

// Toast notification type
export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
}
