export type PlanType = "basic" | "pro" | "business" | null

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: string
  features: string[]
  stripePriceId: string
}

export interface UserSubscription {
  id: string
  userId: string
  planId: string
  status: "active" | "canceled" | "expired"
  currentPeriodEnd: string
  stripeCustomerId?: string
  stripePriceId?: string
}

export const FEATURES_BY_PLAN = {
  basic: ["personal-appraisal", "idea-matrix-basic", "community-basic"],
  pro: ["personal-appraisal", "idea-matrix-pro", "ability-matrix", "community-pro", "ai-insights"],
  business: [
    "personal-appraisal",
    "idea-matrix-enterprise",
    "ability-matrix",
    "community-enterprise",
    "ai-insights",
    "expert-mentorship",
    "api-access",
  ],
} as const

