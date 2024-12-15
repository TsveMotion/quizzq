'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

export default function TeacherDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem('adminToken')
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-primary/20 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Logo />
            <div className="flex items-center gap-4">
              <span className="text-gray-400">Teacher Portal</span>
              <Button 
                variant="secondary" 
                onClick={handleLogout}
                className="text-sm"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Manage your classes and monitor student progress
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Students', value: '45' },
              { label: 'Active Classes', value: '3' },
              { label: 'Quizzes Created', value: '12' },
              { label: 'Avg. Class Score', value: '85%' }
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm"
              >
                <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="space-y-6 mb-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            </div>

            <div className="overflow-x-auto rounded-xl bg-gray-900/50 border border-primary/20">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-primary/20">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Quiz</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {[
                    { student: 'John Doe', action: 'Completed Quiz', quiz: 'Math 101', score: '95%' },
                    { student: 'Jane Smith', action: 'Started Quiz', quiz: 'Physics Basics', score: '-' },
                    { student: 'Mike Johnson', action: 'Completed Quiz', quiz: 'Chemistry', score: '88%' }
                  ].map((activity, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-white">{activity.student}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{activity.action}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{activity.quiz}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{activity.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button variant="secondary" className="w-full">
              Create New Quiz
            </Button>
            <Button variant="secondary" className="w-full">
              View All Students
            </Button>
            <Button variant="secondary" className="w-full">
              Generate Reports
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
} 