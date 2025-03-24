export interface User {
  id: string
  email: string
  user_metadata: {
    avatar_url?: string
  }
}

export interface Profile {
  id: string
  username: string
  full_name: string
  bio: string
  plan_type: "business" | "career" | null
}

export type PlanType = "business" | "career"

export interface UserProfile extends Profile {
  age?: number
  country?: string
}

