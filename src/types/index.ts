import { User as SupabaseUser } from '@supabase/supabase-js';
import { ReactNode } from 'react'

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
  full_name?: string;
  avatar_url?: string;
  subscription_tier: 'free' | 'premium' | 'enterprise';
  points: number;
  created_at: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  created_at: string;
  duration?: number;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correct_answer?: string;
  explanation?: string;
  type: 'multiple-choice' | 'true-false' | 'open-ended';
}

export interface AssessmentResult {
  id: string;
  assessment_id: string;
  user_id: string;
  score: number;
  answers: Record<string, string>;
  completed_at: string;
  time_taken?: number;
  feedback?: string;
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

// UI Types
export type Theme = 'light' | 'dark'

export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  children: ReactNode
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
}

// Premium Types
export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export interface Subscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'canceled' | 'expired';
  current_period_end: string;
  cancel_at_period_end: boolean;
}

// Admin Types
export interface AdminStats {
  total_users: number;
  active_subscriptions: number;
  total_assessments_completed: number;
  revenue_this_month: number;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  role: 'user' | 'admin';
  subscription_status: 'free' | 'basic' | 'pro' | 'elite';
  created_at: string;
  last_login?: string;
}

export interface PersonalAppraisal {
  id: string;
  user_id: string;
  skills: string[];
  experience: string[];
  certifications?: string[];
  interests: string[];
  created_at: string;
}

export interface Experience {
  title: string;
  company?: string;
  description: string;
  start_date: string;
  end_date?: string;
  skills_used: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date_obtained: string;
  expiry_date?: string;
}

export interface IdeaMatrix {
  id: string;
  user_id: string;
  categories: {
    name: string;
    ideas: string[];
  }[];
  created_at: string;
}

export interface IdeaCategory {
  name: string;
  ideas: Idea[];
}

export interface Idea {
  id: string;
  title: string;
  description: string;
  required_skills: string[];
  potential_score: number;
  feasibility_score: number;
}

export interface AbilityMatrix {
  id: string;
  user_id: string;
  ideas: {
    id: string;
    name: string;
    competency_score: number;
  }[];
  created_at: string;
}

export interface RankedIdea {
  idea_id: string;
  competency_score: number;
  gap_analysis: SkillGap[];
}

export interface SkillGap {
  skill: string;
  current_level: number;
  required_level: number;
}

export interface PreferenceMatrix {
  id: string;
  user_id: string;
  ideas: {
    id: string;
    name: string;
    preference_score: number;
  }[];
  created_at: string;
}

export interface IdeaPreference {
  idea_id: string;
  interest_level: number;
  passion_score: number;
  lifestyle_fit: number;
}

export interface SimilarityMatrix {
  id: string;
  user_id: string;
  matches: {
    idea_id: string;
    name: string;
    match_score: number;
    recommendations: string[];
  }[];
  created_at: string;
}

export interface MatchedIdea {
  idea_id: string;
  match_score: number;
  ability_score: number;
  preference_score: number;
  next_steps: NextStep[];
}

export interface NextStep {
  type: 'mentorship' | 'resource' | 'skill_development';
  title: string;
  description: string;
  priority: number;
}

export interface GamificationProfile {
  user_id: string;
  points: number;
  rank: string;
  badges: Badge[];
  favorite_features: string[];
  engagement_score: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  image_url: string;
  earned_at: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  stripe_price_id: string;
}

// Gamification Types
export interface GamificationRanking {
  id: string;
  user_id: string;
  feature_id: string;
  rank: number;
  created_at: string;
}

export interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  avatar_url?: string;
  points: number;
  rank: number;
}

// Subscription Types
export interface SubscriptionTier {
  id: string;
  name: 'free' | 'premium' | 'enterprise';
  price: number;
  features: string[];
  stripe_price_id?: string;
}

// AI Types
export interface AIRecommendation {
  id: string;
  user_id: string;
  type: 'mentor' | 'resource' | 'skill';
  content: string;
  priority: number;
  created_at: string;
} 