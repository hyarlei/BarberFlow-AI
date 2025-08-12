import { apiService } from './api.service'
import { ApiResponse, Payment } from '@/types'

export interface CreatePaymentRequest {
  appointmentId: string
  amount: number
  method: string
  transactionId?: string
  metadata?: Record<string, any>
}

export interface UpdatePaymentRequest {
  status?: string
  transactionId?: string
  metadata?: Record<string, any>
}

export class PaymentService {
  async createPayment(data: CreatePaymentRequest): Promise<ApiResponse<Payment>> {
    return apiService.post<Payment>('/payments', data, true)
  }

  async getPayments(page: number = 1, limit: number = 10): Promise<ApiResponse<{data: Payment[], meta: any}>> {
    return apiService.get<{data: Payment[], meta: any}>(`/payments?page=${page}&limit=${limit}`, true)
  }

  async getPayment(id: string): Promise<ApiResponse<Payment>> {
    return apiService.get<Payment>(`/payments/${id}`, true)
  }

  async updatePayment(id: string, data: UpdatePaymentRequest): Promise<ApiResponse<Payment>> {
    return apiService.patch<Payment>(`/payments/${id}`, data, true)
  }

  async processWebhook(data: any): Promise<ApiResponse<any>> {
    return apiService.post<any>('/payments/webhook', data)
  }
}

export const paymentService = new PaymentService()
