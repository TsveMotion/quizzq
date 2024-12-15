'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
  showLink?: boolean
}

export default function Logo({ className = "", showLink = true }: LogoProps) {
  const LogoContent = () => (
    <div className={`relative group ${className}`}>
      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-primary to-primary-light bg-clip-text text-transparent">
        QuizzQ
      </span>
      <span className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-primary/20 to-primary-light/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
    </div>
  )

  if (!showLink) {
    return <LogoContent />
  }

  return (
    <Link href="/">
      <LogoContent />
    </Link>
  )
} 