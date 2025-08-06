import {
    Appointment,
    AppointmentStatus,
    CreateAppointmentForm,
    PaginatedResponse
} from '@/types'
import { apiService } from './api.service'

export class AppointmentService {
  // Get appointments with filtering and pagination
  async getAppointments(params?: {
    page?: number
    limit?: number
    status?: AppointmentStatus
    barberId?: string
    clientId?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<PaginatedResponse<Appointment>> {
    const queryParams = new URLSearchParams()
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/appointments${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    const response = await apiService.get<PaginatedResponse<Appointment>>(endpoint, true)
    
    return response.data
  }

  // Get single appointment
  async getAppointment(id: string): Promise<Appointment> {
    const response = await apiService.get<Appointment>(`/appointments/${id}`, true)
    return response.data
  }

  // Create new appointment
  async createAppointment(data: CreateAppointmentForm): Promise<Appointment> {
    const response = await apiService.post<Appointment>('/appointments', data, true)
    return response.data
  }

  // Update appointment
  async updateAppointment(id: string, data: Partial<CreateAppointmentForm>): Promise<Appointment> {
    const response = await apiService.patch<Appointment>(`/appointments/${id}`, data, true)
    return response.data
  }

  // Update appointment status
  async updateStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    const response = await apiService.patch<Appointment>(`/appointments/${id}/status`, { status }, true)
    return response.data
  }

  // Cancel appointment
  async cancelAppointment(id: string, reason?: string): Promise<Appointment> {
    const response = await apiService.patch<Appointment>(`/appointments/${id}/cancel`, { reason }, true)
    return response.data
  }

  // Confirm appointment
  async confirmAppointment(id: string): Promise<Appointment> {
    return this.updateStatus(id, AppointmentStatus.CONFIRMED)
  }

  // Complete appointment
  async completeAppointment(id: string): Promise<Appointment> {
    return this.updateStatus(id, AppointmentStatus.COMPLETED)
  }

  // Get available time slots
  async getAvailableSlots(barberId: string, date: string): Promise<string[]> {
    const response = await apiService.get<string[]>(`/appointments/slots/${barberId}?date=${date}`, true)
    return response.data
  }

  // Get upcoming appointments
  async getUpcomingAppointments(limit = 10): Promise<Appointment[]> {
    const response = await apiService.get<Appointment[]>(`/appointments/upcoming?limit=${limit}`, true)
    return response.data
  }

  // Get today's appointments
  async getTodayAppointments(): Promise<Appointment[]> {
    const today = new Date().toISOString().split('T')[0]
    const result = await this.getAppointments({
      dateFrom: today,
      dateTo: today,
      limit: 100
    })
    return result.data
  }

  // Get appointment history
  async getAppointmentHistory(params?: {
    page?: number
    limit?: number
    clientId?: string
    barberId?: string
  }): Promise<PaginatedResponse<Appointment>> {
    return this.getAppointments({
      ...params,
      status: AppointmentStatus.COMPLETED
    })
  }

  // Reschedule appointment
  async rescheduleAppointment(id: string, newDateTime: string): Promise<Appointment> {
    const response = await apiService.patch<Appointment>(`/appointments/${id}/reschedule`, {
      scheduledFor: newDateTime
    }, true)
    return response.data
  }
}

export const appointmentService = new AppointmentService()
