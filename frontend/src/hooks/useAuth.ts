import { authService } from '@/services/auth.service'
import { User } from '@/types'
import { useEffect, useState } from 'react'

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  })

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const isAuth = authService.isAuthenticated()
        
        if (isAuth) {
          const user = authService.getUser()
          if (user) {
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false
            })
            return
          }
          
          // Try to get fresh user data if token is valid but no user data
          const currentUser = await authService.getCurrentUser()
          if (currentUser) {
            setAuthState({
              user: currentUser,
              isAuthenticated: true,
              isLoading: false
            })
            return
          }
        }

        // Not authenticated or failed to get user
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      } catch (error) {
        console.error('Auth initialization error:', error)
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false
        })
      }
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const authData = await authService.login({ email, password })
      
      setAuthState({
        user: authData.user,
        isAuthenticated: true,
        isLoading: false
      })

      return { success: true, data: authData }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Login failed' 
      }
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }))
      
      const authData = await authService.register(userData)
      
      setAuthState({
        user: authData.user,
        isAuthenticated: true,
        isLoading: false
      })

      return { success: true, data: authData }
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }))
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Registration failed' 
      }
    }
  }

  const logout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
    }
  }

  const refreshAuth = async () => {
    try {
      const authData = await authService.refreshToken()
      
      if (authData) {
        setAuthState({
          user: authData.user,
          isAuthenticated: true,
          isLoading: false
        })
        return true
      }
      
      // Refresh failed
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
      return false
    } catch (error) {
      console.error('Token refresh error:', error)
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false
      })
      return false
    }
  }

  return {
    ...authState,
    login,
    register,
    logout,
    refreshAuth,
    // Helper methods
    isClient: authState.user?.role === 'CLIENT',
    isBarber: authState.user?.role === 'BARBER', 
    isAdmin: authState.user?.role === 'ADMIN'
  }
}
