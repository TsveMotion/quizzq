'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authService } from '@/services/authService'

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!authService.checkAuth()) {
      router.push('/admin/login')
    }
  }, [router])

  // Show nothing while checking authentication
  if (!authService.isAuthenticated) {
    return null
  }

  return <>{children}</>
} 