interface Idea {
  id: string
  title: string
  description: string
  category: string
  user_id: string
  analysis?: {
    strengths: string[]
    challenges: string[]
    opportunities: string[]
    improvements: string[]
    nextSteps: string[]
  }
  visibility?: "public" | "private" | "invite-only"
  type?: "business" | "career"
  created_at?: string
  updated_at?: string
}

export type { Idea }

