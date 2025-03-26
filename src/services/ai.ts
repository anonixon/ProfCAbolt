import axios from 'axios'

const DEEPSEEKS_API_URL = import.meta.env.VITE_DEEPSEEKS_API_URL
const DEEPSEEKS_API_KEY = import.meta.env.VITE_DEEPSEEKS_API_KEY

if (!DEEPSEEKS_API_URL || !DEEPSEEKS_API_KEY) {
  throw new Error('Missing DeepSeeks API configuration')
}

const api = axios.create({
  baseURL: DEEPSEEKS_API_URL,
  headers: {
    'Authorization': `Bearer ${DEEPSEEKS_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export interface AIAnalysisInput {
  skills: string[]
  experience: string[]
  interests: string[]
  certifications?: string[]
}

export interface AIRecommendation {
  title: string
  description: string
  matchScore: number
  requiredSkills: string[]
  skillGaps: {
    skill: string
    currentLevel: number
    requiredLevel: number
  }[]
  nextSteps: {
    type: 'mentorship' | 'resource' | 'skill_development'
    title: string
    description: string
    priority: number
  }[]
}

export const aiService = {
  async analyzeProfile(input: AIAnalysisInput): Promise<AIRecommendation[]> {
    try {
      const { data } = await api.post('/analyze-profile', input)
      return data.recommendations
    } catch (error) {
      console.error('Error analyzing profile:', error)
      throw error
    }
  },

  async generateIdeas(input: AIAnalysisInput): Promise<AIRecommendation[]> {
    try {
      const { data } = await api.post('/generate-ideas', input)
      return data.recommendations
    } catch (error) {
      console.error('Error generating ideas:', error)
      throw error
    }
  },

  async rankIdeas(
    ideas: string[],
    criteria: { skills: string[]; interests: string[] }
  ): Promise<AIRecommendation[]> {
    try {
      const { data } = await api.post('/rank-ideas', {
        ideas,
        criteria,
      })
      return data.recommendations
    } catch (error) {
      console.error('Error ranking ideas:', error)
      throw error
    }
  },

  async getSimilarIdeas(idea: string): Promise<AIRecommendation[]> {
    try {
      const { data } = await api.post('/similar-ideas', {
        idea,
      })
      return data.recommendations
    } catch (error) {
      console.error('Error getting similar ideas:', error)
      throw error
    }
  },

  async getNextSteps(idea: string): Promise<AIRecommendation['nextSteps']> {
    try {
      const { data } = await api.post('/next-steps', {
        idea,
      })
      return data.nextSteps
    } catch (error) {
      console.error('Error getting next steps:', error)
      throw error
    }
  },
} 