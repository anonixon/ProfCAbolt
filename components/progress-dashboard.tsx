"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"

interface UserProgress {
  level: number
  xp: number
  nextLevelXp: number
  milestones: string[]
  weeklyStreak: number
}

export function ProgressDashboard() {
  const [progress, setProgress] = useState<UserProgress | null>(null)

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase.from("user_gamification").select("*").eq("user_id", user.id).single()

    if (error) {
      console.error("Error fetching user progress:", error)
    } else {
      setProgress(data)
    }
  }

  if (!progress) {
    return <div>Loading progress...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium">Level {progress.level}</p>
            <Progress value={(progress.xp / progress.nextLevelXp) * 100} className="w-full" />
            <p className="text-sm text-muted-foreground mt-1">
              {progress.xp} / {progress.nextLevelXp} XP
            </p>
          </div>
          <div>
            <p className="text-sm font-medium mb-2">Milestones</p>
            <div className="flex flex-wrap gap-2">
              {progress.milestones.map((milestone, index) => (
                <Badge key={index} variant="secondary">
                  {milestone}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Weekly Streak</p>
            <p className="text-2xl font-bold">{progress.weeklyStreak} days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

