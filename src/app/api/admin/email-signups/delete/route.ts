import { NextResponse } from 'next/server'
import { db } from '@/services/db'

export async function DELETE(request: Request) {
  try {
    const { email } = await request.json()
    
    // Delete the email signup from the database
    await db.deleteEmailSignup(email)
    
    return NextResponse.json({ 
      success: true, 
      message: 'Email signup deleted successfully' 
    })
  } catch (error) {
    console.error('Error deleting email signup:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete email signup' },
      { status: 500 }
    )
  }
} 