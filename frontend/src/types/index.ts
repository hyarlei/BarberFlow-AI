import React from 'react';

// Base Types
export interface User {
  id: string
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
  profile: UserProfile
}

export interface UserProfile {
  id: string
  userId: string
  firstName: string
  lastName: string
  phone?: string
  avatar?: string
  birthDate?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

export enum UserRole {
  CLIENT = 'CLIENT',
  BARBER = 'BARBER',
  ADMIN = 'ADMIN'
}

// Authentication Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  role?: UserRole
}

export interface AuthResponse {
  user: User
  access_token: string
  expires_in: string
}

// Service Types
export interface Service {
  map(arg0: (service: any) => React.JSX.Element): React.ReactNode;
  id: string
  name: string
  description: string
  duration: number // in minutes
  price: number
  category: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Appointment Types
export interface AppointmentUser {
  id: string
  appointmentId: string
  userId: string
  user: {
    id: string
    email: string
    profile: UserProfile
  }
}

export interface Appointment {
  id: string
  barberId: string
  serviceId: string
  scheduledFor: string
  duration: number
  totalPrice: number
  notes?: string
  status: AppointmentStatus
  createdAt: string
  updatedAt: string
  completedAt?: string
  cancelledAt?: string
  cancelReason?: string
  users: AppointmentUser[]
  barber: {
    id: string
    profile: UserProfile
  }
  service: Service
  payment?: Payment
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW'
}

// Payment Types
export interface Payment {
  id: string
  userId: string
  appointmentId?: string
  amount: number
  method: PaymentMethod
  status: PaymentStatus
  transactionId?: string
  gatewayResponse?: Record<string, any>
  metadata?: Record<string, any>
  processedAt?: string
  createdAt: string
  updatedAt: string
  appointment?: Appointment
  user?: User
}

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PIX = 'PIX',
  BANK_TRANSFER = 'BANK_TRANSFER'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

// Barber Specific Types
export interface BarberProfile {
  id: string
  userId: string
  specialties: string[]
  experience: number
  workingHours: WorkingHours[]
  rating: number
  totalReviews: number
  isActive: boolean
  portfolio: PortfolioItem[]
}

export interface WorkingHours {
  dayOfWeek: number // 0-6 (Sunday-Saturday)
  startTime: string // HH:mm format
  endTime: string // HH:mm format
  isActive: boolean
}

export interface PortfolioItem {
  id: string
  barberId: string
  imageUrl: string
  description: string
  category: string
  createdAt: string
}

// Review Types
export interface Review {
  id: string
  appointmentId: string
  clientId: string
  barberId: string
  rating: number
  comment?: string
  createdAt: string
  client: User
  barber: User
}

// Analytics Types
export interface DashboardStats {
  totalAppointments: number
  totalRevenue: number
  averageRating: number
  cancelationRate: number
  todayAppointments: number
  weeklyGrowth: number
  monthlyGrowth: number
}

export interface RevenueChart {
  date: string
  revenue: number
  appointments: number
}

// API Response Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// Form Types
export interface CreateAppointmentForm {
  clientId?: string
  barberId: string
  serviceIds: string[]
  scheduledFor: string
  notes?: string
}

export interface UpdateProfileForm {
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
}

// Notification Types
export interface Notification {
  id: string
  userId: string
  appointmentId?: string
  type: NotificationType
  title: string
  message: string
  content?: string
  link?: string
  metadata?: Record<string, any>
  isRead: boolean
  sentAt?: string
  createdAt: string
  user?: User
  appointment?: Appointment
}

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  PUSH = 'PUSH'
}

// Component Props Types
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export interface InputProps {
  label?: string
  error?: string
  required?: boolean
  className?: string
}
