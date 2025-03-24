import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"
import { stripe } from "@/utils/stripe"

export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Get user's subscription info
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("stripe_customer_id, stripe_subscription_id")
      .eq("user_id", userId)
      .single()

    // If user has a Stripe subscription, cancel it
    if (subscription?.stripe_subscription_id) {
      try {
        await stripe.subscriptions.cancel(subscription.stripe_subscription_id)
      } catch (error) {
        console.error("Error canceling Stripe subscription:", error)
      }
    }

    // Delete user's data from Supabase tables
    const { error: deleteError } = await supabase.from("user_subscriptions").delete().eq("user_id", userId)
    if (deleteError) {
      console.error("Error deleting user subscription:", deleteError)
    }

    // Delete the user's auth account
    const { error: authError } = await supabase.auth.admin.deleteUser(userId)
    if (authError) {
      throw authError
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting user account:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to delete account",
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

