import { ApiResponse } from '@/types'

// Base API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
// Base API configuration
// Certificando-se que a URL da API sempre inclua o prefixo /api/v1
const API_BASE_URL = 'http://localhost:3001/api/v1'

interface RequestOptions extends RequestInit {
  requireAuth?: boolean
}

class ApiService {
  private baseURL: string
  private defaultHeaders: HeadersInit

  constructor() {
    this.baseURL = API_BASE_URL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('access_token')
  }

  private getHeaders(requireAuth = false): HeadersInit {
    const headers = { ...this.defaultHeaders }
    
    if (requireAuth) {
      const token = this.getAuthToken()
      if (token) {
        ;(headers as any).Authorization = `Bearer ${token}`
      }
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const contentType = response.headers.get('content-type')
    
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`)
      }
      
      return data
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return {
      data: null as T,
      message: 'Success',
      success: true
    }
  }

  async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const { requireAuth = false, ...requestOptions } = options
    
    const url = `${this.baseURL}${endpoint}`
    const headers = this.getHeaders(requireAuth)

    try {
      const response = await fetch(url, {
        ...requestOptions,
        headers: {
          ...headers,
          ...requestOptions.headers,
        },
      })

      return await this.handleResponse<T>(response)
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', requireAuth })
  }

  async post<T>(
    endpoint: string,
    data?: any,
    requireAuth = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      requireAuth,
    })
  }

  async put<T>(
    endpoint: string,
    data?: any,
    requireAuth = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      requireAuth,
    })
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    requireAuth = false
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      requireAuth,
    })
  }

  async delete<T>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', requireAuth })
  }

  // File upload method
  async uploadFile<T>(
    endpoint: string,
    file: File,
    requireAuth = true
  ): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)

    const headers: HeadersInit = {}
    if (requireAuth) {
      const token = this.getAuthToken()
      if (token) {
        (headers as any).Authorization = `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      })

      return await this.handleResponse<T>(response)
    } catch (error) {
      console.error('File Upload Error:', error)
      throw error
    }
  }
}

// Export singleton instance
export const apiService = new ApiService()

// Utility functions for common patterns
export const withErrorHandling = async <T>(
  apiCall: () => Promise<ApiResponse<T>>,
  onError?: (error: Error) => void
): Promise<T | null> => {
  try {
    const response = await apiCall()
    return response.data
  } catch (error) {
    const errorObj = error instanceof Error ? error : new Error('Unknown error')
    console.error('API Error:', errorObj)
    
    if (onError) {
      onError(errorObj)
    }
    
    return null
  }
}

export default apiService
