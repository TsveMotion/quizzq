import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const db = {
  // Email Signups
  createEmailSignup: async (email: string) => {
    return prisma.emailSignup.create({
      data: { email }
    })
  },

  getEmailSignups: async () => {
    return prisma.emailSignup.findMany({
      orderBy: { timestamp: 'desc' }
    })
  },

  deleteEmailSignup: async (email: string) => {
    return prisma.emailSignup.delete({
      where: { email }
    })
  },

  // Users
  createUser: async (data: { 
    name: string
    email: string
    password: string
    role: 'USER' | 'TEACHER' | 'ADMIN'
  }) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role
      }
    })
  },

  getUsers: async () => {
    return prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    })
  },

  // Authentication
  validateAdmin: async (email: string, password: string) => {
    console.log('Validating admin:', email)
    const user = await prisma.user.findUnique({
      where: { 
        email,
        role: 'ADMIN'  // Only find admin users
      }
    })
    console.log('Found admin user:', !!user)

    if (!user || !user.password) {
      console.log('Admin validation failed:', { 
        exists: !!user, 
        hasPassword: !!user?.password
      })
      return null
    }

    const validPassword = await bcrypt.compare(password, user.password)
    console.log('Password valid:', validPassword)
    
    if (!validPassword) {
      return null
    }

    return user
  },

  validateUser: async (email: string, password: string) => {
    console.log('Validating user:', email)
    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log('Database query result:', { 
      found: !!user, 
      role: user?.role,
      hasPassword: !!user?.password,
      email: user?.email
    })

    if (!user || !user.password) {
      console.log('Validation failed: No user or no password')
      return null
    }

    const validPassword = await bcrypt.compare(password, user.password)
    console.log('Password validation:', { 
      valid: validPassword,
      role: user.role
    })
    
    if (!validPassword) {
      console.log('Validation failed: Invalid password')
      return null
    }

    return user
  },

  // Metrics
  getMetrics: async () => {
    const [totalUsers, totalSignups, activeQuizzes] = await Promise.all([
      prisma.user.count(),
      prisma.emailSignup.count(),
      prisma.quiz.count()
    ])

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const newUsersToday = await prisma.user.count({
      where: {
        createdAt: {
          gte: today
        }
      }
    })

    return {
      totalUsers,
      totalSignups,
      activeQuizzes,
      newUsersToday
    }
  },

  resetUserPassword: async (userId: string, newPassword: string) => {
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    return prisma.user.update({
      where: { id: userId },
      data: { 
        password: hashedPassword,
        updatedAt: new Date()
      }
    })
  },

  updateUserStatus: async (userId: string, status: 'ACTIVE' | 'INACTIVE') => {
    return prisma.user.update({
      where: { id: userId },
      data: { 
        status,
        updatedAt: new Date()
      }
    })
  },

  getUserByEmail: async (email: string) => {
    return prisma.user.findUnique({
      where: { email }
    })
  }
} 