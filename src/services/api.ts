import axios from 'axios'
import { supabase } from './auth'
import { PremiumPlan } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const session = await supabase.auth.getSession()
  if (session.data.session?.access_token) {
    config.headers.Authorization = `Bearer ${session.data.session.access_token}`
  }
  return config
})

// Assessment Types
export interface Assessment {
  id: string
  title: string
  description: string
  questions: Question[]
  created_at: string
}

export interface Question {
  id: string
  text: string
  options: string[]
  correct_answer?: string
}

// User Profile Types
export interface UserProfile {
  id: string
  full_name: string
  avatar_url?: string
  bio?: string
  assessments_completed: number
  premium_status: 'free' | 'basic' | 'pro' | 'elite'
}

// API Service
export const apiService = {
  // Assessments
  async getAssessments() {
    const { data } = await api.get<Assessment[]>('/assessments')
    return data
  },

  async getAssessment(id: string) {
    const { data } = await api.get<Assessment>(`/assessments/${id}`)
    return data
  },

  async submitAssessment(id: string, answers: Record<string, string>) {
    const { data } = await api.post(`/assessments/${id}/submit`, { answers })
    return data
  },

  // User Profile
  async getUserProfile() {
    const { data } = await api.get<UserProfile>('/profile')
    return data
  },

  async updateUserProfile(profile: Partial<UserProfile>) {
    const { data } = await api.patch<UserProfile>('/profile', profile)
    return data
  },

  // Premium Features
  async getPremiumPlans(): Promise<PremiumPlan[]> {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/premium/plans`)
    if (!response.ok) {
      throw new Error('Failed to fetch premium plans')
    }
    return response.json()
  },

  async subscribeToPlan(planId: string) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/premium/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    })
    if (!response.ok) {
      throw new Error('Failed to create subscription')
    }
    return response.json()
  },

  // Admin
  async getAdminStats() {
    const { data } = await api.get('/admin/stats')
    return data
  },

  async getAdminUsers() {
    const { data } = await api.get('/admin/users')
    return data
  },
} 