'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'

export default function StudentDashboard() {
  const router = useRouter()

  const handleLogout = () => {
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
              <span className="text-gray-400">Student Portal</span>
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
              Student Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Track your progress and take quizzes
            </p>
          </div>

          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Quizzes Completed', value: '8' },
              { label: 'Average Score', value: '92%' },
              { label: 'Current Streak', value: '5 days' },
              { label: 'Total Points', value: '1,250' }
            ].map((stat, index) => (
              <div className="p-6 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm">
                <h3 className="text-gray-400 text-sm mb-2">{stat.label}</h3>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Available Quizzes */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-white">Available Quizzes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: 'Mathematics 101', difficulty: 'Medium', questions: 15, time: '30 mins' },
                { title: 'Physics Basics', difficulty: 'Hard', questions: 20, time: '45 mins' },
                { title: 'Chemistry Intro', difficulty: 'Easy', questions: 10, time: '20 mins' },
                { title: 'Biology Quiz', difficulty: 'Medium', questions: 15, time: '30 mins' }
              ].map((quiz, index) => (
                <div key={index} className="p-6 rounded-xl bg-gray-900/50 border border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
                  <h3 className="text-xl font-semibold text-primary-light mb-3">
                    {quiz.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span>{quiz.difficulty}</span>
                    <span>•</span>
                    <span>{quiz.questions} questions</span>
                    <span>•</span>
                    <span>{quiz.time}</span>
                  </div>
                  <Button variant="secondary" className="w-full">
                    Start Quiz
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Completed Quiz', quiz: 'Mathematics 101', score: '95%', date: '2 hours ago' },
                { action: 'Started Quiz', quiz: 'Physics Basics', score: '-', date: '1 day ago' },
                { action: 'Completed Quiz', quiz: 'Chemistry', score: '88%', date: '2 days ago' }
              ].map((activity, index) => (
                <div key={index} className="p-4 rounded-lg bg-gray-900/50 border border-primary/20 flex items-center justify-between">
                  <div>
                    <span className="text-primary-light">{activity.action}</span>
                    <span className="text-gray-400"> - {activity.quiz}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300">{activity.score}</span>
                    <span className="text-gray-500 text-sm">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 