"use client"

import { InputProps } from '@/types'
import { InputHTMLAttributes, forwardRef } from 'react'

interface ExtendedInputProps extends InputProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {}

const Input = forwardRef<HTMLInputElement, ExtendedInputProps>(
  ({ label, error, required = false, className = '', ...props }, ref) => {
    const inputClasses = `
      w-full px-4 py-3 
      bg-white/5 
      border-2 border-[#d4af37]/30 
      rounded-xl 
      text-white 
      placeholder-gray-400 
      backdrop-blur-sm
      transition-all duration-200
      focus:outline-none 
      focus:border-[#d4af37] 
      focus:ring-2 
      focus:ring-[#d4af37]/20
      hover:border-[#d4af37]/50
      ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ')

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[#d4af37]">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          required={required}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-400 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
