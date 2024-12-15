import { NextResponse } from 'next/server'
import { db } from '@/services/db'

export async function POST(request: Request) {
  try {
    const { userId, newPassword = 'Password1' } = await request.json()
    
    // Reset the user's password in the database
    await db.resetUserPassword(userId, newPassword)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Password reset successfully' 
    })
  } catch (error) {
    console.error('Error resetting password:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to reset password' },
      { status: 500 }
    )
  }
} 