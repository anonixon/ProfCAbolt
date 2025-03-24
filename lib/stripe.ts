import Stripe from "stripe"
import { env } from "@/lib/env"

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
})

export const PLAN_PRICE_IDS = {
  basic: env.STRIPE_BASIC_PRICE_ID,
  pro: env.STRIPE_PRO_PRICE_ID,
  elite: env.STRIPE_ELITE_PRICE_ID,
} as const

