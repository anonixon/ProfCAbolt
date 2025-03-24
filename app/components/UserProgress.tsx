"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Recommendation {
  title: string
  description: string
}

export function UserProgress() {
  const [progress, setProgress] = useState(0)
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    fetchUserProgress()
  }, [])

  const fetchUserProgress = async () => {
    try {
      const response = await fetch("/api/user-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "current-user-id", action: "view_progress" }),
      })
      const data = await response.json()
      setProgress(calculateProgress(data.progress))
      setRecommendations(data.recommendations)
    } catch (error) {
      console.error("Error fetching user progress:", error)
    }
  }

  const calculateProgress = (progressData: any) => {
    // Calculate overall progress based on completed actions
    // This is a simplified example and should be adjusted based on your specific progress tracking system
    const totalActions = Object.keys(progressData).length - 1 // Subtract 1 to account for user_id
    const completedActions = Object.values(progressData).filter((value) => value === true).length
    return (completedActions / totalActions) * 100
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-4" />
        <h3 className="font-semibold mb-2">Recommendations:</h3>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index}>
              <h4 className="font-medium">{rec.title}</h4>
              <p className="text-sm text-gray-600">{rec.description}</p>
            </li>
          ))}
        </ul>
        <Button onClick={fetchUserProgress} className="mt-4">
          Refresh Progress
        </Button>
      </CardContent>
    </Card>
  )
}

