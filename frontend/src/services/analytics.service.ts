import { apiService } from './api.service'
import { ApiResponse } from '@/types'

export interface DashboardData {
  totalRevenue: number
  activeClients: number
  completedAppointments: number
  upcomingAppointments: any[]
  recentPayments: any[]
  popularServices: any[]
}

export interface RevenueData {
  daily: { date: string; revenue: number }[]
  weekly: { week: string; revenue: number }[]
  monthly: { month: string; revenue: number }[]
}

export interface ServiceAnalytics {
  name: string
  count: number
}

export interface BarberPerformance {
  id: string
  name: string
  rating: number
  appointmentsCount: number
  revenue: number
}

export interface RetentionRate {
  rate: number
  returningClients: number
  totalClients: number
}

export class AnalyticsService {
  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    return apiService.get<DashboardData>('/analytics/dashboard', true)
  }

  async getRevenueData(): Promise<ApiResponse<RevenueData>> {
    return apiService.get<RevenueData>('/analytics/revenue', true)
  }

  async getPopularServices(): Promise<ApiResponse<ServiceAnalytics[]>> {
    return apiService.get<ServiceAnalytics[]>('/analytics/services', true)
  }

  async getBarberPerformance(): Promise<ApiResponse<BarberPerformance[]>> {
    return apiService.get<BarberPerformance[]>('/analytics/barbers', true)
  }

  async getClientRetentionRate(): Promise<ApiResponse<RetentionRate>> {
    return apiService.get<RetentionRate>('/analytics/retention', true)
  }
}

export const analyticsService = new AnalyticsService()
