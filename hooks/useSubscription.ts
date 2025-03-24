"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import type { PlanType, UserSubscription } from "@/types/subscription"
import { useAuth } from "@/hooks/useAuth"
import { useToast } from "@/components/ui/use-toast"

const FEATURES_BY_PLAN = {
  basic: ["basic_feature"],
  pro: ["basic_feature", "pro_feature"],
  business: ["basic_feature", "pro_feature", "business_feature"],
}

export function useSubscription() {
  const { user } = useAuth()
  const [subscription, setSubscription] = useState<UserSubscription | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (!user) {
      setSubscription(null)
      setLoading(false)
      return
    }

    const fetchSubscription = async () => {
      try {
        const { data, error } = await supabase.from("user_subscriptions").select("*").eq("user_id", user.id).single()

        if (error) {
          // If the error is that the table doesn't exist, we'll just return null
          if (error.code === "42P01") {
            console.warn("user_subscriptions table not found, assuming no subscription")
            setSubscription(null)
            return
          }

          // For other errors, we'll show a toast
          toast({
            title: "Error fetching subscription",
            description: "There was an error loading your subscription details. Please try again later.",
            variant: "destructive",
          })
          console.error("Error fetching subscription:", error)
        } else {
          setSubscription(data)
        }
      } catch (error) {
        console.error("Error in subscription hook:", error)
        setSubscription(null)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscription()

    // Subscribe to realtime subscription updates
    const subscription = supabase
      .channel("subscription_updates")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "user_subscriptions",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          setSubscription(payload.new as UserSubscription)
        },
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, toast])

  const getPlanType = (): PlanType => {
    if (!subscription || subscription.status !== "active") return null

    // Map stripePriceId to plan type
    const priceIdToPlan: Record<string, PlanType> = {
      [process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!]: "basic",
      [process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!]: "pro",
      [process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID!]: "business",
    }

    return priceIdToPlan[subscription.stripe_price_id!] || null
  }

  const hasAccess = (feature: keyof typeof FEATURES_BY_PLAN) => {
    const planType = getPlanType()
    if (!planType) return false
    return FEATURES_BY_PLAN[planType].includes(feature)
  }

  return {
    subscription,
    loading,
    planType: getPlanType(),
    hasAccess,
  }
}

