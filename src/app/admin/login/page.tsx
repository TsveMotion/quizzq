'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import { authService } from '@/services/authService'

export default function AdminLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      const success = await authService.login(
        formData.email,
        formData.password
      )

      if (success) {
        router.push('/admin/dashboard')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
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
                Admin Portal
              </h1>
              <p className="text-gray-400 mt-2">
                Secure access for administrators only
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
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Admin Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Enter admin email"
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
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-primary/20 text-white focus:outline-none focus:border-primary/50 transition-all duration-300 placeholder:text-gray-500"
                    placeholder="Enter password"
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
                      <span>Authenticating...</span>
                    </div>
                  ) : (
                    "Access Admin Portal"
                  )}
                </Button>
              </form>

              <div className="mt-6">
                <p className="text-xs text-gray-400 text-center">
                  This is a secure area. Unauthorized access attempts will be logged and reported.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <Link 
                href="/"
                className="text-sm text-gray-400 hover:text-primary-light transition-colors"
              >
                ← Return to Homepage
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
} 