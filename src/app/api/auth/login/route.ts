import { NextResponse } from 'next/server'
import { db } from '@/services/db'
import jwt from 'jsonwebtoken'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    console.log('Login attempt:', { email })
    
    // Try to validate user (this will check all roles)
    const user = await db.validateUser(email, password)
    console.log('User validation result:', { 
      found: !!user, 
      role: user?.role,
      email: user?.email 
    })
    
    if (user) {
      console.log('User authenticated:', { 
        email: user.email, 
        role: user.role 
      })
      
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      )
      
      return NextResponse.json({ 
        success: true, 
        token,
        role: user.role
      })
    }
    
    console.log('Login failed: Invalid credentials')
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