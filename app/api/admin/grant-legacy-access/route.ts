import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

export async function POST(req: Request) {
  try {
    // Verify admin status (you should implement proper admin authentication)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Execute the migration
    const { error } = await supabase.rpc("grant_legacy_access")

    if (error) {
      console.error("Error granting legacy access:", error)
      return NextResponse.json({ error: "Failed to grant legacy access" }, { status: 500 })
    }

    return NextResponse.json({ message: "Legacy access granted successfully" })
  } catch (error) {
    console.error("Error in grant legacy access:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

