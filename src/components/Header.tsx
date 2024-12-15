'use client'
import Link from 'next/link'
import { useState } from 'react'
import Logo from './Logo'
import Button from './Button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed w-full bg-black/80 backdrop-blur-sm border-b border-primary/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/features" 
              className="text-gray-300 hover:bg-gradient-to-r hover:from-accent-blue hover:via-primary hover:to-primary-light hover:bg-clip-text hover:text-transparent transition-all duration-300"
            >
              Features
            </Link>
            <Link 
              href="/about" 
              className="text-gray-300 hover:bg-gradient-to-r hover:from-accent-blue hover:via-primary hover:to-primary-light hover:bg-clip-text hover:text-transparent transition-all duration-300"
            >
              About Us
            </Link>
            <Link href="/login">
              <Button variant="primary">
                Log In
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-primary-light"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary/20">
            <div className="flex flex-col gap-4">
              <Link 
                href="/features" 
                className="text-gray-300 hover:text-primary-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                href="/about" 
                className="text-gray-300 hover:text-primary-light transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/login"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button variant="primary" className="w-full">
                  Log In
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
} 