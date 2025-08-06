// API Services
export { apiService } from './api.service'
export { appointmentService } from './appointment.service'
export { authService } from './auth.service'
export { serviceService } from './service.service'

// User Service
export class UserService {
  // Implementation will be added as needed
}

// Payment Service  
export class PaymentService {
  // Implementation will be added as needed
}

// Notification Service
export class NotificationService {
  // Implementation will be added as needed
}

// Analytics Service
export class AnalyticsService {
  // Implementation will be added as needed
}

// Re-export service instances
export const userService = new UserService()
export const paymentService = new PaymentService()
export const notificationService = new NotificationService()
export const analyticsService = new AnalyticsService()
