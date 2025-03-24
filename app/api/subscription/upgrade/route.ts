import { NextResponse } from "next/server"
import { stripe } from "@/utils/stripe"
import { supabase } from "@/lib/supabase-client"

export async function POST(req: Request) {
  try {
    const { currentPlan, newPlan, userId } = await req.json()

    // Validate required fields
    if (!currentPlan || !newPlan || !userId) {
      return NextResponse.json({ error: "Missing required fields: currentPlan, newPlan, or userId" }, { status: 400 })
    }

    // Validate the Stripe price ID
    if (!newPlan.stripePriceId) {
      console.error("Missing Stripe price ID for the new plan")
      return NextResponse.json({ error: "Invalid plan configuration: missing Stripe price ID" }, { status: 400 })
    }

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      console.error("Missing NEXT_PUBLIC_SITE_URL environment variable")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Get user's current subscription with error handling
    const { data: subscription, error: subscriptionError } = await supabase
      .from("user_subscriptions")
      .select("stripe_subscription_id, stripe_customer_id")
      .eq("user_id", userId)
      .single()

    if (subscriptionError) {
      console.error("Supabase error:", subscriptionError)
      return NextResponse.json({ error: "Failed to fetch subscription details" }, { status: 500 })
    }

    if (!subscription?.stripe_subscription_id) {
      return NextResponse.json({ error: "No active subscription found" }, { status: 404 })
    }

    // Retrieve the subscription from Stripe
    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id)

    // Calculate proration
    const currentPeriodEnd = new Date(stripeSubscription.current_period_end * 1000)
    const now = new Date()
    const remainingDays = Math.ceil((currentPeriodEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    const currentPlanPrice = Number(currentPlan.price.replace("£", ""))
    const newPlanPrice = Number(newPlan.price.replace("£", ""))

    // Calculate daily rate and proration
    const currentPlanDailyRate = currentPlanPrice / 30
    const newPlanDailyRate = newPlanPrice / 30
    const remainingValue = currentPlanDailyRate * remainingDays
    const proratedAmount = newPlanDailyRate * remainingDays - remainingValue

    try {
      // Create a prorated upgrade session
      const session = await stripe.checkout.sessions.create({
        customer: subscription.stripe_customer_id,
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: newPlan.stripePriceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_end: stripeSubscription.current_period_end,
        },
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?upgrade=cancelled`,
        metadata: {
          userId,
          upgradeFrom: currentPlan.name,
          upgradeTo: newPlan.name,
        },
      })

      if (!session || !session.id) {
        console.error("Stripe session creation failed - no session ID returned")
        return NextResponse.json({ error: "Failed to create Stripe checkout session" }, { status: 500 })
      }

      console.log("Stripe session created successfully:", session.id)

      return NextResponse.json({
        sessionId: session.id,
        proratedAmount,
        newRenewalDate: new Date(stripeSubscription.current_period_end * 1000).toISOString(),
      })
    } catch (error) {
      console.error("Error creating upgrade session:", error)
      return NextResponse.json(
        {
          error: error instanceof Error ? error.message : "Failed to create upgrade session",
          details: error instanceof Error ? error.stack : undefined,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error during upgrade process:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to upgrade subscription",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

