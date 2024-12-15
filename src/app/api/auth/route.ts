import { NextResponse } from 'next/server'
import { db } from '@/services/db'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt:', { email })
    
    const user = await db.validateAdmin(email, password)
    console.log('User found:', !!user)
    
    if (user) {
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      )
      
      return NextResponse.json({ success: true, token })
    }
    
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(
      { success: false, message: 'Authentication failed' },
      { status: 500 }
    )
  }
} 