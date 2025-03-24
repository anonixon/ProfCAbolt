import { supabase } from "@/lib/supabase-client"

export async function addNotification(userId: string, content: string) {
  const { error } = await supabase.from("notifications").insert({ user_id: userId, content })

  if (error) {
    console.error("Error adding notification:", error)
  }
}

