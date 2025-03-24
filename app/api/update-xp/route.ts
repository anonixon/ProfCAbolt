import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase-client"

const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000]

export async function POST(req: Request) {
  try {
    const { userId, xpGained, action } = await req.json()

    // Fetch current user XP and level
    const { data: userData, error: userError } = await supabase
      .from("user_gamification")
      .select("xp, level")
      .eq("user_id", userId)
      .single()

    if (userError) throw userError

    const newXP = userData.xp + xpGained
    let newLevel = userData.level
    let leveledUp = false

    // Check for level up
    while (newLevel < XP_THRESHOLDS.length - 1 && newXP >= XP_THRESHOLDS[newLevel + 1]) {
      newLevel++
      leveledUp = true
    }

    // Update user XP and level
    const { error: updateError } = await supabase
      .from("user_gamification")
      .update({ xp: newXP, level: newLevel })
      .eq("user_id", userId)

    if (updateError) throw updateError

    // Check for new achievements
    const { data: newAchievement, error: achievementError } = await supabase.rpc("check_achievements", {
      p_user_id: userId,
      p_action: action,
      p_xp: newXP,
      p_level: newLevel,
    })

    if (achievementError) throw achievementError

    return NextResponse.json({
      newXP,
      newLevel,
      leveledUp,
      newAchievement: newAchievement ? newAchievement[0] : null,
    })
  } catch (error) {
    console.error("Error updating XP:", error)
    return NextResponse.json({ error: "Failed to update XP" }, { status: 500 })
  }
}

