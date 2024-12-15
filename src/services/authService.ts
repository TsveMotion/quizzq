export const authService = {
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      
      if (data.success) {
        localStorage.setItem('adminToken', data.token)
        authService.isAuthenticated = true
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken')
    authService.isAuthenticated = false
  },

  checkAuth: () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      authService.isAuthenticated = false
      return false
    }

    try {
      // Note: We're not verifying the token here since it's client-side
      // Real verification happens on API calls
      authService.isAuthenticated = true
      return true
    } catch {
      authService.isAuthenticated = false
      return false
    }
  }
} 