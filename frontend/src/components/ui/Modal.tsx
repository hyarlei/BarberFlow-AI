"use client"

import { ModalProps } from '@/types'
import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-lg mx-auto">
        <div 
          className="
            bg-gradient-to-br from-[#0f0f23] via-[#1a1a2e] to-[#16213e]
            border-2 border-[#d4af37]/30
            rounded-2xl
            shadow-2xl
            backdrop-blur-xl
            transform transition-all duration-300
            animate-fade-in
          "
        >
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between p-6 border-b border-[#d4af37]/20">
              <h3 className="text-xl font-semibold text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="
                  p-2 
                  text-gray-400 
                  hover:text-white 
                  hover:bg-white/10 
                  rounded-lg 
                  transition-colors
                "
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}
          
          {/* Content */}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  // Render portal only on client side
  if (typeof window === 'undefined') return null

  return createPortal(modalContent, document.body)
}

export default Modal
