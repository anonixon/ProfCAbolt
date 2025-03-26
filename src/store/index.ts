import { create } from 'zustand'
import { Assessment, UserProfile } from '@services/api'

interface AppState {
  // UI State
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  setTheme: (theme: 'light' | 'dark') => void

  // Assessment State
  currentAssessment: Assessment | null
  assessmentResults: Record<string, any>
  setCurrentAssessment: (assessment: Assessment | null) => void
  setAssessmentResults: (results: Record<string, any>) => void

  // User State
  userProfile: UserProfile | null
  setUserProfile: (profile: UserProfile | null) => void
}

export const useStore = create<AppState>((set) => ({
  // UI State
  theme: 'light',
  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTheme: (theme) => set({ theme }),

  // Assessment State
  currentAssessment: null,
  assessmentResults: {},
  setCurrentAssessment: (assessment) => set({ currentAssessment: assessment }),
  setAssessmentResults: (results) => set({ assessmentResults: results }),

  // User State
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
})) 