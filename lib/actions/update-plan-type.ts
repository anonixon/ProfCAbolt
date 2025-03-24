"use server"

import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import type { PlanType } from "@/types/user"

export async function updatePlanType(userId: string, planType: PlanType) {
  try {
    const { error } = await supabase.from("profiles").update({ plan_type: planType }).eq("id", userId)

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Error updating plan type:", error)
    return { success: false, error: "Failed to update plan type" }
  }
}

