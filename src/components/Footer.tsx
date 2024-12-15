'use client'
import { motion } from 'framer-motion'
import Logo from './Logo'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-primary/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo showLink={false} />
            <p className="text-gray-400 text-sm">
              Empowering students to achieve academic excellence through interactive learning.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/features" className="text-gray-400 hover:text-primary-light transition-colors">Features</a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-primary-light transition-colors">About Us</a>
              </li>
              <li>
                <a href="/login" className="text-gray-400 hover:text-primary-light transition-colors">Log In</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-primary-light transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-primary-light transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">support@quizzq.com</li>
              <li className="text-gray-400"></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} QuizzQ. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary-light transition-colors">
                <span className="sr-only">Facebook</span>
                {/* Add social media icons here */}
              </a>
              {/* Add more social media links */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 