'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

export default function LoginPage() {
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
      console.log('Attempting login with:', formData.email)
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      console.log('Login response:', data)
      
      if (response.ok && data.success) {
        console.log('Login successful, role:', data.role)
        // Redirect based on user role
        switch (data.role) {
          case 'ADMIN':
            router.push('/admin/dashboard')
            break
          case 'TEACHER':
            console.log('Redirecting to teacher dashboard')
            router.push('/teacher/dashboard')
            break
          default:
            router.push('/dashboard')
            break
        }
      } else {
        console.error('Login failed:', data)
        setError(data.message || 'Invalid credentials. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('An error occurred during login. Please try again.')
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
                Welcome Back
              </h1>
              <p className="text-gray-400 mt-2">
                Sign in to continue your learning journey
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
                    placeholder="Enter your password"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center text-gray-300">
                    <input type="checkbox" className="mr-2 rounded border-gray-600 text-primary focus:ring-primary" />
                    Remember me
                  </label>
                  <Link href="/forgot-password" className="text-primary-light hover:text-primary transition-colors">
                    Forgot password?
                  </Link>
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
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-primary-light hover:text-primary transition-colors">
                    Sign up
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