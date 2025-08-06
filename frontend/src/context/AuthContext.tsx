'use client'

import { AuthState, useAuth } from '@/hooks/useAuth';
import { createContext, ReactNode, useContext } from 'react';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; data?: any; error?: string }>
  register: (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    phone?: string
  }) => Promise<{ success: boolean; data?: any; error?: string }>
  logout: () => Promise<void>
  refreshAuth: () => Promise<boolean>
  isClient: boolean
  isBarber: boolean
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useAuth()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

export { AuthContext };

