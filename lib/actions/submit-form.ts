"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase-client"

export async function submitForm(formData: FormData) {
  try {
    const data = Object.fromEntries(formData)

    const { error } = await supabase.from("form_submissions").insert([data])

    if (error) throw error

    revalidatePath("/dashboard")
    redirect("/dashboard")
  } catch (error) {
    console.error("Form submission error:", error)
    throw new Error("Failed to submit form")
  }
}

