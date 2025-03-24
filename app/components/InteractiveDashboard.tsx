"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface Achievement {
  title: string
  description: string
  completed: boolean
}

export function InteractiveDashboard() {
  const [progress, setProgress] = useState(0)
  const [achievements, setAchievements] = useState<Achievement[]>([])

  useEffect(() => {
    // In a real application, this would be fetched from an API
    setAchievements([
      { title: "Idea Generator", description: "Generate your first business idea", completed: true },
      { title: "Skill Master", description: "Identify 5 key skills for your chosen career", completed: false },
      { title: "Market Analyst", description: "Complete a market analysis for your business idea", completed: false },
    ])
    setProgress(33)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center justify-between">
              <span>{achievement.title}</span>
              <Badge variant={achievement.completed ? "default" : "secondary"}>
                {achievement.completed ? "Completed" : "In Progress"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

