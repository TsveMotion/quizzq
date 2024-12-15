'use client'
import { motion } from 'framer-motion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black pt-24">
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

          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent"
              >
                Coming Soon
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-8 rounded-xl bg-gradient-to-b from-gray-900/90 to-gray-900/50 border border-primary/30 shadow-[0_0_50px_-12px] shadow-primary/20 backdrop-blur-sm"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h2 className="text-2xl text-primary-light mb-4">Exciting Features Coming Your Way</h2>
                    <p className="text-gray-300">
                      We're working hard to bring you an amazing learning experience. Stay tuned for updates!
                    </p>
                  </motion.div>
                  
                  <div className="flex justify-center gap-3">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-2 h-2 rounded-full bg-primary-light"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-2 h-2 rounded-full bg-primary-light"
                    />
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: 0.4,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                      className="w-2 h-2 rounded-full bg-primary-light"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
} 