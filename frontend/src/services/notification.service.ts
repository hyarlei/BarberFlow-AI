import { apiService } from './api.service'
import { ApiResponse, Notification } from '@/types'

export interface CreateNotificationRequest {
  userId: string
  title: string
  content: string
  type: string
  link?: string
  metadata?: Record<string, any>
}

export class NotificationService {
  async createNotification(data: CreateNotificationRequest): Promise<ApiResponse<Notification>> {
    return apiService.post<Notification>('/notifications', data, true)
  }

  async getNotifications(page: number = 1, limit: number = 10): Promise<ApiResponse<{data: Notification[], meta: any}>> {
    return apiService.get<{data: Notification[], meta: any}>(`/notifications?page=${page}&limit=${limit}`, true)
  }

  async markAsRead(id: string): Promise<ApiResponse<Notification>> {
    return apiService.post<Notification>(`/notifications/${id}/read`, {}, true)
  }

  async deleteNotification(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/notifications/${id}`, true)
  }
}

export const notificationService = new NotificationService()
