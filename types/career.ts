export interface CareerAssessment {
  currentRole: string
  yearsExperience: string
  education: string
  skills: string[]
  interests: string[]
  goals: {
    shortTerm: string
    longTerm: string
  }
  preferredIndustries: string[]
  workStyle: string
  remotePreference: boolean
  salaryExpectations: string
}

export interface CareerPath {
  id: string
  title: string
  description: string
  matchScore: number
  marketDemand: "high" | "medium" | "low"
  requiredSkills: string[]
  salaryRange: {
    currency: string
    min: number
    max: number
  }
}

export interface SkillGap {
  skill: string
  importance: "critical" | "recommended" | "optional"
  resources: {
    type: "course" | "certification" | "workshop"
    title: string
    provider: string
    url: string
    duration: string
    cost: number
  }[]
}

export interface CareerRoadmap {
  milestones: {
    title: string
    description: string
    timeframe: string
    status: "completed" | "in-progress" | "pending"
    tasks: {
      title: string
      status: "completed" | "in-progress" | "pending"
    }[]
  }[]
}

