import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: subscription, error } = await supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .single()

    if (error) {
      console.error("Error fetching subscription:", error)
      return NextResponse.json({ error: "Failed to fetch subscription" }, { status: 500 })
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error("Error in subscription check:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

