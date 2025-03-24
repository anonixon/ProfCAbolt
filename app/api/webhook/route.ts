import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase } from "@/lib/supabase-client"
import logger from "@/lib/logger"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = headers().get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)

    logger.info("Processing webhook event", { type: event.type })

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session

      // Get the user ID from metadata
      const userId = session.metadata?.userId

      if (userId) {
        // Update user's subscription status in your database
        const { error } = await supabase.from("user_subscriptions").upsert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          subscription_status: "active",
          plan_id: session.metadata?.planId,
          current_period_end: new Date(session.subscription as string).toISOString(),
        })

        if (error) {
          logger.error(error, "Error updating subscription status")
          return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
        }
      }

      // Check if this is an upgrade
      if (session.metadata?.upgradeFrom && session.metadata?.upgradeTo) {
        const { error } = await supabase
          .from("user_subscriptions")
          .update({
            stripe_price_id: session.metadata.stripePriceId,
            status: "active",
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", session.metadata.userId)

        if (error) {
          logger.error(error, "Error updating subscription after upgrade")
          return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 })
        }
      }
    }

    logger.info("Webhook processed successfully")
    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error(error, "Webhook handler error")
    return NextResponse.json(
      {
        error: "Webhook handler failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 400 },
    )
  }
}

