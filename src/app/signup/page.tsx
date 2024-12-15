'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to login page
        router.push('/login?registered=true')
      } else {
        throw new Error(data.message || 'Registration failed')
      }
    } catch (err) {
      console.error('Registration error:', err)
      setError('Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="relative">
        {/* Background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/20 rounded-full blur-[100px]"
          />
        </div>

        <div className="relative container mx-auto px-4 pt-12">
          <div className="max-w-md mx-auto">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-block">
                <Logo showLink={false} />
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent">
                Create Your Account
              </h1>
              <p className="text-gray-400 mt-2">
                Join our community of learners
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative p-8 rounded-xl bg-gradient-to-b from-gray-900/90 to-gray-900/50 border border-primary/30 shadow-[0_0_50px_-12px] shadow-primary/20 backdrop-blur-sm"
            >
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Create a password"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  variant="primary"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Already have an account?{' '}
                  <Link href="/login" className="text-primary-light hover:text-primary transition-colors">
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
} 