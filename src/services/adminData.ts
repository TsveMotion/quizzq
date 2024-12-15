// Simulated database for demo purposes
export interface EmailSignup {
  email: string
  timestamp: string
  status: 'pending' | 'verified'
}

type UserRole = 'ADMIN' | 'TEACHER' | 'USER'
type UserStatus = 'ACTIVE' | 'INACTIVE'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinDate: string
  lastActive: string
}

export const adminData = {
  systemStats: {
    cpuUsage: '45%',
    memoryUsage: '2.8GB / 4GB',
    uptime: '15 days',
    serverStatus: 'Healthy'
  },
  users: [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@quizzq.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      joinDate: '2024-02-15',
      lastActive: '2024-02-20'
    },
    {
      id: '2',
      name: 'Teacher User',
      email: 'teacher@quizzq.com',
      role: 'TEACHER',
      status: 'ACTIVE',
      joinDate: '2024-02-14',
      lastActive: '2024-02-20'
    },
    {
      id: '3',
      name: 'Regular User',
      email: 'user@quizzq.com',
      role: 'USER',
      status: 'ACTIVE',
      joinDate: '2024-02-13',
      lastActive: '2024-02-19'
    }
  ],
  quizzes: [
    { id: 1, title: 'Mathematics 101', completions: 156, avgScore: 85 },
    { id: 2, title: 'Physics Basics', completions: 98, avgScore: 78 },
    // Add more quiz data
  ],
  metrics: {
    totalUsers: 1234,
    activeQuizzes: 456,
    completionRate: '89%',
    newUsersToday: 45,
    totalCompletions: 3567,
    averageScore: '82%'
  },
  emailSignups: [
    { email: 'example@test.com', timestamp: '2024-02-20 10:30:00', status: 'verified' },
    { email: 'user@domain.com', timestamp: '2024-02-20 09:15:00', status: 'pending' }
  ] as EmailSignup[],
  
  addEmailSignup: (email: string) => {
    const newSignup: EmailSignup = {
      email,
      timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
      status: 'pending'
    }
    adminData.emailSignups.unshift(newSignup)
    adminData.metrics.totalUsers += 1
    adminData.metrics.newUsersToday += 1
  }
} 