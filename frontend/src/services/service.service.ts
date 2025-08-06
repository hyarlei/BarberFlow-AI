import { PaginatedResponse, Service } from '@/types'
import { apiService } from './api.service'

export class ServiceService {
  // Get all services
  async getServices(params?: {
    page?: number
    limit?: number
    category?: string
    isActive?: boolean
    barberId?: string
  }): Promise<PaginatedResponse<Service>> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const response = await apiService.get<PaginatedResponse<Service>>(endpoint, true)
    
    return response.data
  }

  // Get single service
  async getService(id: string): Promise<Service> {
    const response = await apiService.get<Service>(`/services/${id}`, true)
    return response.data
  }

  // Create new service (Admin only)
  async createService(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> {
    const response = await apiService.post<Service>('/services', data, true)
    return response.data
  }

  // Update service (Admin only)
  async updateService(id: string, data: Partial<Omit<Service, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Service> {
    const response = await apiService.patch<Service>(`/services/${id}`, data, true)
    return response.data
  }

  // Delete service (Admin only)
  async deleteService(id: string): Promise<void> {
    await apiService.delete(`/services/${id}`, true)
  }

  // Get services by barber
  async getServicesByBarber(barberId: string): Promise<Service[]> {
    const response = await apiService.get<Service[]>(`/services/barber/${barberId}`, true)
    return response.data
  }

  // Get service categories
  async getCategories(): Promise<string[]> {
    const response = await apiService.get<string[]>('/services/categories', true)
    return response.data
  }

  // Toggle service status
  async toggleServiceStatus(id: string): Promise<Service> {
    const response = await apiService.patch<Service>(`/services/${id}/toggle`, {}, true)
    return response.data
  }

  // Get popular services
  async getPopularServices(limit = 6): Promise<Service[]> {
    const response = await apiService.get<Service[]>(`/services/popular?limit=${limit}`, true)
    return response.data
  }
}

export const serviceService = new ServiceService()
