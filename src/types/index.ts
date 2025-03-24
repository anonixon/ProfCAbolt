import { User as SupabaseUser } from '@supabase/supabase-js';

export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthResponse {
  user: SupabaseUser | null;
  error: AuthError | null;
}

export interface AuthContextType {
  user: SupabaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  category: string;
}

export interface AssessmentFormProps {
  questions: AssessmentQuestion[];
  onSubmit: (answers: Record<string, any>) => Promise<void>;
  isSubmitting: boolean;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  description: string;
  skills: string[];
  education: string[];
  salary: {
    min: number;
    max: number;
  };
  growth: number;
  match: number;
}

export interface JobMarketTrend {
  id: string;
  title: string;
  description: string;
  insights: {
    id: string;
    text: string;
  }[];
}

export interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  market: string;
  competition: string;
  resources: string[];
  risks: string[];
  potential: number;
}

export interface MarketAnalysis {
  id: string;
  ideaId: string;
  marketSize: number;
  competition: string;
  opportunities: {
    id: string;
    title: string;
    description: string;
  }[];
  threats: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface BusinessPlan {
  id: string;
  ideaId: string;
  executiveSummary: string;
  marketAnalysis: string;
  financialProjections: string;
  marketingStrategy: string;
  operations: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  skills: string[];
  experience: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }[];
}

export interface ProfileStats {
  id: string;
  userId: string;
  completedAssessments: number;
  careerMatches: number;
  skillGaps: number;
  recentAchievements: {
    id: string;
    title: string;
    date: string;
  }[];
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  interests: string[];
  goals: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  id: string;
  userId: string;
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  emailUpdates: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: 'basic' | 'pro' | 'elite';
  status: 'active' | 'canceled' | 'expired';
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiError {
  message: string;
  status: number;
}

export interface ApiResponse<T> {
  data: T | null;
  error: ApiError | null;
}

export interface AuthError {
  message: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  userId: string;
  title: string;
  description: string;
  questions: Question[];
  results: AssessmentResult;
  status: 'draft' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'text' | 'rating';
  options?: string[];
  required: boolean;
}

export interface AssessmentResult {
  score: number;
  recommendations: string[];
  careerPaths: string[];
  skills: string[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'course';
  url: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
} 