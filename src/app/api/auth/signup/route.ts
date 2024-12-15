import { NextResponse } from 'next/server'
import { db } from '@/services/db'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await db.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'Email already registered' },
        { status: 400 }
      )
    }

    // Create new user
    const user = await db.createUser({
      name,
      email,
      password,
      role: 'USER'  // Default role for new signups
    })

    return NextResponse.json({
      success: true,
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, message: 'Registration failed' },
      { status: 500 }
    )
  }
} 