import { apiService } from './api.service'
import { ApiResponse } from '@/types'

export interface FaceAnalysisRequest {
  imageBase64: string
}

export interface FaceAnalysisResponse {
  faceShape: string
  hairSuggestions: string[]
  skinTone: string
  facialFeatures: Record<string, any>
}

export interface DemandPredictionRequest {
  date: string
  serviceTypes?: string[]
}

export interface DemandPredictionResponse {
  predictions: {
    date: string
    hour: number
    demand: 'low' | 'medium' | 'high'
    estimatedAppointments: number
  }[]
}

export class AiService {
  async analyzeFace(data: FaceAnalysisRequest): Promise<ApiResponse<FaceAnalysisResponse>> {
    return apiService.post<FaceAnalysisResponse>('/ai/face-analysis', data, true)
  }

  async predictDemand(data: DemandPredictionRequest): Promise<ApiResponse<DemandPredictionResponse>> {
    return apiService.post<DemandPredictionResponse>('/ai/predict-demand', data, true)
  }

  async getProductRecommendations(userId: string): Promise<ApiResponse<any[]>> {
    return apiService.get<any[]>(`/ai/recommend-products/${userId}`, true)
  }

  async getServiceRecommendations(userId: string): Promise<ApiResponse<any[]>> {
    return apiService.get<any[]>(`/ai/recommend-services/${userId}`, true)
  }

  async getBarberMatching(userId: string): Promise<ApiResponse<any[]>> {
    return apiService.get<any[]>(`/ai/barber-matching/${userId}`, true)
  }
}

export const aiService = new AiService()
