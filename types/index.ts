export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  subscription_tier?: "free" | "basic" | "pro" | "elite"
}

export interface Idea {
  id: string
  title: string
  description: string
  category: "business" | "career"
  user_id: string
  created_at: string
  updated_at: string
  status: "draft" | "published" | "archived"
  score?: number
  feedback?: Feedback[]
}

export interface Feedback {
  id: string
  idea_id: string
  user_id: string
  content: string
  rating: number
  created_at: string
  updated_at: string
}

export interface ApiResponse<T> {
  data?: T
  error?: {
    message: string
    code?: string
  }
}

export interface PaginationParams {
  page: number
  limit: number
}

export interface SortParams {
  field: string
  direction: "asc" | "desc"
}

export type FilterParams = Record<string, string | number | boolean | null>

