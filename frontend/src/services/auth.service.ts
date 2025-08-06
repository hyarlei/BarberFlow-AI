import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
    User
} from '@/types'
import { apiService } from './api.service'

export class AuthService {
  private readonly TOKEN_KEY = 'access_token'
  private readonly USER_KEY = 'user_data'

  // Authentication methods
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/login', credentials)
    
    if (response.success && response.data) {
      this.setAuthData(response.data)
    }
    
    return response.data
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>('/auth/register', userData)
    
    if (response.success && response.data) {
      this.setAuthData(response.data)
    }
    
    return response.data
  }

  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout', {}, true)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearAuthData()
    }
  }

  async refreshToken(): Promise<AuthResponse | null> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/refresh', {}, true)
      
      if (response.success && response.data) {
        this.setAuthData(response.data)
        return response.data
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.clearAuthData()
    }
    
    return null
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const response = await apiService.get<User>('/auth/profile', true)
      return response.success ? response.data : null
    } catch (error) {
      console.error('Get current user failed:', error)
      return null
    }
  }

  // Token management
  setAuthData(authData: AuthResponse): void {
    if (typeof window === 'undefined') return
    
    localStorage.setItem(this.TOKEN_KEY, authData.access_token)
    localStorage.setItem(this.USER_KEY, JSON.stringify(authData.user))
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(this.TOKEN_KEY)
  }

  getUser(): User | null {
    if (typeof window === 'undefined') return null
    
    const userData = localStorage.getItem(this.USER_KEY)
    return userData ? JSON.parse(userData) : null
  }

  clearAuthData(): void {
    if (typeof window === 'undefined') return
    
    localStorage.removeItem(this.TOKEN_KEY)
    localStorage.removeItem(this.USER_KEY)
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) return false

    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const currentTime = Date.now() / 1000
      return payload.exp > currentTime
    } catch {
      return false
    }
  }

  hasRole(role: string): boolean {
    const user = this.getUser()
    return user?.role === role
  }

  isClient(): boolean {
    return this.hasRole('CLIENT')
  }

  isBarber(): boolean {
    return this.hasRole('BARBER')
  }

  isAdmin(): boolean {
    return this.hasRole('ADMIN')
  }
}

export const authService = new AuthService()
