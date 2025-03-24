export interface BusinessFormData {
  skills: string
  experience: string
  interests: string
  learning: string
  ideas: string
}

export interface BusinessIdea {
  title: string
  description: string
  keyPoints: string[]
}

export interface GenerateIdeasResponse {
  ideas: BusinessIdea[]
  error?: string
}

