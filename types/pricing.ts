export interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  ctaLink: string
  interval?: "monthly" | "yearly"
}

export interface CheckoutState {
  plan: PricingPlan | null
  step: "plan-confirmation" | "account" | "payment" | "success"
}

