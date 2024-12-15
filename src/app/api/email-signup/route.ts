import { NextResponse } from 'next/server'
import { db } from '@/services/db'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    const signup = await db.createEmailSignup(email)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email signup recorded successfully' 
    })
  } catch (error) {
    console.error('Email signup error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to record email signup' },
      { status: 500 }
    )
  }
} 