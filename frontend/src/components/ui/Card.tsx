import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  onClick 
}) => {
  const baseClasses = `
    bg-gradient-to-br from-white/10 via-white/5 to-transparent
    backdrop-blur-xl
    border border-[#d4af37]/20
    rounded-2xl
    shadow-lg
    transition-all duration-300
  `.trim().replace(/\s+/g, ' ')

  const hoverClasses = hover ? 'hover:border-[#d4af37]/40 hover:shadow-xl hover:shadow-[#d4af37]/10 hover:-translate-y-1' : ''
  const clickableClasses = onClick ? 'cursor-pointer' : ''

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
