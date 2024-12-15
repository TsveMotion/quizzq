const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@quizzq.com' },
    update: {},
    create: {
      email: 'admin@quizzq.com',
      password: adminPassword,
      role: 'ADMIN',
      name: 'Admin User'
    }
  })

  // Create teacher user with known password
  const teacherPassword = await bcrypt.hash('teacher123', 10)
  await prisma.user.upsert({
    where: { email: 'teacher@quizzq.com' },
    update: {
      password: teacherPassword  // Update password even if user exists
    },
    create: {
      email: 'teacher@quizzq.com',
      password: teacherPassword,
      role: 'TEACHER',
      name: 'Teacher User'
    }
  })

  // Create regular user
  const userPassword = await bcrypt.hash('user123', 10)
  await prisma.user.upsert({
    where: { email: 'user@quizzq.com' },
    update: {},
    create: {
      email: 'user@quizzq.com',
      password: userPassword,
      role: 'USER',
      name: 'Regular User'
    }
  })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect()) 