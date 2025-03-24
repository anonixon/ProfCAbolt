export interface Database {
  public: {
    Tables: {
      ideas: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          category: string
          analysis: {
            strengths: string[]
            challenges: string[]
            opportunities: string[]
            improvements: string[]
            nextSteps: string[]
          } | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          category: string
          analysis?: {
            strengths: string[]
            challenges: string[]
            opportunities: string[]
            improvements: string[]
            nextSteps: string[]
          } | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          category?: string
          analysis?: {
            strengths: string[]
            challenges: string[]
            opportunities: string[]
            improvements: string[]
            nextSteps: string[]
          } | null
          created_at?: string
          updated_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
  }
}

