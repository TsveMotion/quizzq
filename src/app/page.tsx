'use client'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Header from '@/components/Header'
import EmailSignup from '@/components/EmailSignup'
import Footer from '@/components/Footer'

// Enhanced animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
}

export default function LandingPage() {
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black overflow-hidden">
        {/* Hero Section */}
        <div className="relative">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-1/4 -left-1/4 w-[1000px] h-[600px] bg-accent-blue/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1.2, 1, 1.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
              className="absolute top-1/3 -right-1/4 w-[800px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
            />
          </div>

          <div className="relative container mx-auto px-4 pt-32 pb-20">
            <div className="max-w-4xl mx-auto text-center">
              {/* Hero Content */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="space-y-6"
              >
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent"
                >
                  Boost Your Grades with Smart Quiz Learning
                </motion.h1>
                <motion.p
                  variants={fadeInUp}
                  className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-300 leading-relaxed"
                >
                  Join thousands of students who have improved their grades by 20% or more
                </motion.p>
                <motion.p
                  variants={fadeInUp}
                  className="text-base sm:text-lg mb-20"
                >
                  Interactive quizzes powered by AI to help you master your subjects faster
                </motion.p>

                {/* Email Signup */}
                <motion.div
                  variants={fadeInUp}
                  className="relative z-10 my-40"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-accent-blue via-primary to-primary-light rounded-xl opacity-30 blur-xl animate-pulse" />
                  <EmailSignup />
                </motion.div>

                {/* Stats Section */}
                <motion.div
                  ref={statsRef}
                  variants={staggerContainer}
                  initial="hidden"
                  animate={statsInView ? "visible" : "hidden"}
                  className="grid md:grid-cols-3 gap-8 mt-40 mb-32"
                >
                  {[
                    { number: "1000+", label: "Active Users" },
                    { number: "5000+", label: "Quizzes Created" },
                    { number: "98%", label: "Success Rate" }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      className="p-6 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-all duration-300"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={statsInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="text-3xl font-bold text-primary-light mb-2"
                      >
                        {stat.number}
                      </motion.div>
                      <div className="text-gray-400">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Features Grid */}
                <motion.div
                  ref={featuresRef}
                  variants={staggerContainer}
                  initial="hidden"
                  animate={featuresInView ? "visible" : "hidden"}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <motion.div
                    variants={fadeInUp}
                    className="p-8 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4 text-primary-light">
                      <svg className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-light mb-3">
                      AI-Powered Learning
                    </h3>
                    <p className="text-gray-400">
                      Smart algorithms adapt to your learning style and pace for optimal results
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="p-8 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4 text-primary-light">
                      <svg className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-light mb-3">
                      Customizable Experience
                    </h3>
                    <p className="text-gray-400">
                      Create and customize quizzes to match your specific learning goals
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="p-8 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4 text-primary-light">
                      <svg className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-light mb-3">
                      Secure Platform
                    </h3>
                    <p className="text-gray-400">
                      Your learning data is protected with enterprise-grade security
                    </p>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="p-8 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm hover:border-primary/40 transition-colors group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="mb-4 text-primary-light">
                      <svg className="w-8 h-8 mx-auto group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary-light mb-3">
                      Community Driven
                    </h3>
                    <p className="text-gray-400">
                      Join a community of learners and share knowledge together
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
