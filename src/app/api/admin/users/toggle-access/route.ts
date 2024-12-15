import { NextResponse } from 'next/server'
import { adminData } from '@/services/adminData'

export async function POST(request: Request) {
  try {
    const { userId, newStatus } = await request.json()
    
    // Update the user's status in adminData
    const userIndex = adminData.users.findIndex(user => user.id === userId)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    adminData.users[userIndex].status = newStatus
    
    return NextResponse.json({ 
      success: true, 
      message: `User access ${newStatus === 'ACTIVE' ? 'granted' : 'revoked'} successfully` 
    })
  } catch (error) {
    console.error('Error updating user access:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to update user access' },
      { status: 500 }
    )
  }
} 