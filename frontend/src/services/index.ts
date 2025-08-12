// API Services
export { apiService } from './api.service'
export { appointmentService } from './appointment.service'
export { authService } from './auth.service'
export { serviceService } from './service.service'
export { paymentService } from './payment.service'
export { notificationService } from './notification.service'
export { analyticsService } from './analytics.service'
export { aiService } from './ai.service'

// User Service
export class UserService {
  // Implementation will be added as needed
}

// Re-export service instances
export const userService = new UserService()
