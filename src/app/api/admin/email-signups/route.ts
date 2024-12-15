import { NextResponse } from 'next/server'
import { db } from '@/services/db'

export async function GET() {
  try {
    const emailSignups = await db.getEmailSignups()
    
    return NextResponse.json({ 
      success: true, 
      emailSignups
    })
  } catch (error) {
    console.error('Error fetching email signups:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch email signups' },
      { status: 500 }
    )
  }
} 