'use client'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick,
  type = 'button'
}: ButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-medium transition-colors"
  const variantStyles = {
    primary: "bg-primary hover:bg-primary-light text-white",
    secondary: "bg-gray-900/50 border border-primary/20 text-white hover:border-primary/40"
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  )
} 