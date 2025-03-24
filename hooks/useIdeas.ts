import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import type { Idea } from "@/types"

async function fetchIdeas(userId: string) {
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) throw error
  return data as Idea[]
}

export function useIdeas(userId: string) {
  return useQuery({
    queryKey: ["ideas", userId],
    queryFn: () => fetchIdeas(userId),
    enabled: !!userId,
  })
}

