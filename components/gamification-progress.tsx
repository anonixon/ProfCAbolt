"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"

interface GamificationData {
  xp: number
  level: number
  badges: string[]
}

export function GamificationProgress() {
  const [gamificationData, setGamificationData] = useState<GamificationData | null>(null)

  useEffect(() => {
    fetchGamificationData()
  }, [])

  const fetchGamificationData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase.from("user_gamification").select("*").eq("user_id", user.id).single()

    if (error) {
      console.error("Error fetching gamification data:", error)
    } else {
      setGamificationData(data)
    }
  }

  if (!gamificationData) {
    return <div>Loading gamification data...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Level {gamificationData.level}</p>
            <Progress value={(gamificationData.xp % 1000) / 10} className="w-full" />
            <p className="text-sm text-muted-foreground mt-1">{gamificationData.xp} XP</p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Badges</p>
            <div className="flex flex-wrap gap-2">
              {gamificationData.badges.map((badge, index) => (
                <Badge key={index} variant="secondary">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

