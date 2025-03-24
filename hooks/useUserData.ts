"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/types"

export function useUserData(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

        if (error) throw error

        setProfile(data)
      } catch (e) {
        setError(e instanceof Error ? e : new Error("An unknown error occurred"))
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [userId])

  return { profile, loading, error }
}

