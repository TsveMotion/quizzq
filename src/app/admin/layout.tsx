import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal - QuizzQ',
  description: 'Admin dashboard for QuizzQ platform',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-black">
      {children}
    </div>
  )
} 