'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Button from './Button'

export default function EmailSignup() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Send email to API
      const response = await fetch('/api/email-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit email')
      }

      setSubmitted(true)
      setEmail('')
    } catch (error) {
      console.error('Error submitting email:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {!submitted ? (
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-primary to-primary-light rounded-lg ${focused ? 'opacity-100' : 'opacity-50'} blur transition-opacity duration-300`} />
            <div className="relative flex flex-col sm:flex-row gap-4 bg-black/80 p-2 rounded-lg">
              <div className="relative flex-grow group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-gray-900/90 border-2 border-transparent focus:border-primary/50 text-white focus:outline-none transition-all duration-300 placeholder:text-gray-500"
                  required
                />
              </div>
              <Button type="submit">
                Join Beta
              </Button>
            </div>
          </div>
        </motion.form>
      ) : (
        <motion.div 
          className="relative p-6 rounded-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-blue via-primary to-primary-light rounded-lg opacity-50 blur" />
          <div className="relative bg-black/80 p-6 rounded-lg">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent mb-2">
                Thank you for joining!
              </h3>
              <p className="text-gray-300">
                We'll keep you updated on our latest developments.
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
} 