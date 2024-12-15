'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Logo from '@/components/Logo'
import { adminData } from '@/services/adminData'
import { authService } from '@/services/authService'
import AdminProtected from '@/components/AdminProtected'
import ConfirmDialog from '@/components/ConfirmDialog'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')
  const [emailSignups, setEmailSignups] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: 'delete' | 'revoke' | 'reset';
    data: any;
  }>({
    isOpen: false,
    type: 'delete',
    data: null
  })
  const [customPassword, setCustomPassword] = useState('Password1')
  const [users, setUsers] = useState(adminData.users)

  useEffect(() => {
    // Fetch email signups when component mounts
    fetchEmailSignups()
  }, [])

  const fetchEmailSignups = async () => {
    try {
      const response = await fetch('/api/admin/email-signups')
      const data = await response.json()
      if (data.success) {
        setEmailSignups(data.emailSignups)
      }
    } catch (error) {
      console.error('Error fetching email signups:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    authService.logout()
    router.push('/admin/login')
  }

  const downloadCSV = () => {
    // Convert users data to CSV
    const headers = ['ID,Name,Email,Join Date,Last Active']
    const userRows = adminData.users.map(user => 
      `${user.id},${user.name},${user.email},${user.joinDate},${user.lastActive}`
    )
    const csvContent = [...headers, ...userRows].join('\n')
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `users-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const downloadEmailList = () => {
    const headers = ['Email,Status,Timestamp']
    const rows = emailSignups.map(signup => 
      `${signup.email},${signup.status},${signup.timestamp}`
    )
    const csvContent = [...headers, ...rows].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `email-signups-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  const handleDeleteEmailSignup = (email: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'delete',
      data: email
    })
  }

  const handleRevokeAccess = (userId: string, currentStatus: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'revoke',
      data: { userId, currentStatus }
    })
  }

  const handleResetPassword = (userId: string) => {
    setConfirmDialog({
      isOpen: true,
      type: 'reset',
      data: userId
    })
  }

  const handleConfirmAction = async () => {
    try {
      switch (confirmDialog.type) {
        case 'delete':
          const response = await fetch('/api/admin/email-signups/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: confirmDialog.data })
          })
          
          if (!response.ok) {
            throw new Error('Failed to delete email signup')
          }
          
          // Remove the email from the local state
          setEmailSignups(prev => 
            prev.filter(signup => signup.email !== confirmDialog.data)
          )
          break

        case 'revoke':
          const revokeResponse = await fetch('/api/admin/users/toggle-access', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userId: confirmDialog.data.userId,
              newStatus: confirmDialog.data.currentStatus === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
            })
          })

          if (!revokeResponse.ok) {
            throw new Error('Failed to update user access')
          }

          // Update the local state
          setUsers(prev => prev.map(user => 
            user.id === confirmDialog.data.userId 
              ? { ...user, status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
              : user
          ))
          break

        case 'reset':
          const resetResponse = await fetch('/api/admin/users/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userId: confirmDialog.data,
              newPassword: customPassword 
            })
          })

          if (!resetResponse.ok) {
            throw new Error('Failed to reset password')
          }

          alert(`Password has been reset to: ${customPassword}`)
          break
      }
    } catch (error) {
      console.error('Action failed:', error)
      alert('Failed to perform action. Please try again.')
    } finally {
      setConfirmDialog(prev => ({ ...prev, isOpen: false }))
      setCustomPassword('Password1') // Reset to default
    }
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-black">
        {/* Admin Header */}
        <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-primary/20 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Logo />
              <div className="flex items-center gap-4">
                <span className="text-gray-400">Admin Portal</span>
                <Button 
                  variant="secondary" 
                  onClick={handleLogout}
                  className="text-sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-24 pb-12">
          <div className="container mx-auto px-4">
            {/* Dashboard Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-accent-blue via-primary to-primary-light bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Real-time platform analytics and management
              </p>
            </div>

            {/* System Stats */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">System Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(adminData.systemStats).map(([key, value], index) => (
                  <div
                    key={key}
                    className="p-4 rounded-lg bg-gray-900/50 border border-primary/20"
                  >
                    <h3 className="text-gray-400 text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-lg font-semibold text-primary-light">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                { label: 'Total Users', value: adminData.metrics.totalUsers.toLocaleString() },
                { label: 'Active Quizzes', value: adminData.metrics.activeQuizzes },
                { label: 'Total Signups', value: emailSignups.length },
                { label: 'New Users Today', value: adminData.metrics.newUsersToday }
              ].map((metric, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-gray-900/50 border border-primary/20 backdrop-blur-sm"
                >
                  <h3 className="text-gray-400 text-sm mb-2">{metric.label}</h3>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* User Management Section */}
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">User Management</h2>
              </div>

              <div className="overflow-x-auto rounded-xl bg-gray-900/50 border border-primary/20">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {adminData.users.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 text-sm text-white">{user.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{user.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user?.role === 'ADMIN' 
                              ? 'bg-purple-500/20 text-purple-400'
                              : user?.role === 'TEACHER'
                              ? 'bg-blue-500/20 text-blue-400'
                              : 'bg-green-500/20 text-green-400'
                          }`}>
                            {user?.role?.toLowerCase() || 'user'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user?.status === 'ACTIVE'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {user?.status || 'inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm space-x-2">
                          <Button
                            variant="secondary"
                            onClick={() => handleResetPassword(user.id)}
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Reset Password
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => handleRevokeAccess(user.id, user.status)}
                            className={user.status === 'ACTIVE' ? 'text-red-400 hover:text-red-300' : 'text-green-400 hover:text-green-300'}
                          >
                            {user.status === 'ACTIVE' ? 'Remove Access' : 'Grant Access'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Email Signups Section */}
            <div className="space-y-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-white">Email Signups</h2>
                <Button 
                  variant="secondary"
                  onClick={downloadEmailList}
                  className="flex items-center gap-2"
                >
                  Export Email List
                </Button>
              </div>

              <div className="overflow-x-auto rounded-xl bg-gray-900/50 border border-primary/20">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-primary/20">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/10">
                    {emailSignups.map((signup, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 text-sm text-white">{signup.email}</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            signup.status === 'VERIFIED' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {signup.status.toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {new Date(signup.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Button
                            variant="secondary"
                            onClick={() => handleDeleteEmailSignup(signup.email)}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button variant="secondary" className="w-full">
                View All Users
              </Button>
              <Button variant="secondary" className="w-full">
                Generate Usage Report
              </Button>
              <Button variant="secondary" className="w-full" onClick={downloadCSV}>
                Download User Data
              </Button>
            </div>
          </div>
        </main>

        {/* Add Confirmation Dialog */}
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          title={
            confirmDialog.type === 'delete' ? 'Delete Email Signup' :
            confirmDialog.type === 'revoke' ? 
              (confirmDialog.data?.currentStatus === 'ACTIVE' ? 'Remove User Access' : 'Grant User Access') :
            'Reset User Password'
          }
          message={
            confirmDialog.type === 'delete' ? 'Are you sure you want to delete this email signup?' :
            confirmDialog.type === 'revoke' ? 
              (confirmDialog.data?.currentStatus === 'ACTIVE' ? 
                'Would you like to remove user access?' : 
                'Would you like to grant user access?') :
            'Enter new password (defaults to "Password1" if left empty):'
          }
          confirmText={
            confirmDialog.type === 'delete' ? 'Delete' :
            confirmDialog.type === 'revoke' ? 
              (confirmDialog.data?.currentStatus === 'ACTIVE' ? 'Confirm' : 'Grant Access') :
            'Reset Password'
          }
          type={confirmDialog.type === 'delete' ? 'danger' : 'warning'}
          onConfirm={handleConfirmAction}
          onCancel={() => {
            setConfirmDialog(prev => ({ ...prev, isOpen: false }))
            setCustomPassword('')
          }}
          customInput={
            confirmDialog.type === 'reset' ? {
              type: 'text', // Changed from 'password' to show the text clearly
              value: customPassword,
              onChange: (e) => setCustomPassword(e.target.value),
              placeholder: 'Enter new password (or leave empty for "Password1")'
            } : undefined
          }
        />
      </div>
    </AdminProtected>
  )
} 