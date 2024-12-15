'use client'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
  type?: 'danger' | 'warning' | 'info'
  customInput?: {
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
  }
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  type = 'danger',
  customInput
}: ConfirmDialogProps) {
  const colors = {
    danger: 'text-red-400',
    warning: 'text-yellow-400',
    info: 'text-blue-400'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCancel}
          />
          
          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl mx-4"
          >
            <div className="bg-gray-900 border border-primary/20 rounded-xl p-8 shadow-xl">
              <h3 className={`text-xl font-semibold mb-4 ${colors[type]}`}>
                {title}
              </h3>
              <p className="text-gray-300 mb-8 text-lg">
                {message}
              </p>
              
              {customInput && (
                <div className="mb-8">
                  <input
                    type={customInput.type}
                    value={customInput.value}
                    onChange={customInput.onChange}
                    placeholder={customInput.placeholder}
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-primary/20 text-white focus:outline-none focus:border-primary/50 text-lg"
                  />
                </div>
              )}
              
              <div className="flex justify-end gap-4">
                <Button
                  variant="secondary"
                  onClick={onCancel}
                  className="px-6 py-3 text-base"
                >
                  {cancelText}
                </Button>
                <Button
                  variant="secondary"
                  onClick={onConfirm}
                  className={`px-6 py-3 text-base ${
                    type === 'danger' ? 'text-red-400 hover:text-red-300' : 
                    type === 'warning' ? 'text-yellow-400 hover:text-yellow-300' : 
                    'text-blue-400 hover:text-blue-300'
                  }`}
                >
                  {confirmText}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
} 