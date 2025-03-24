"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Recommendation {
  id: string
  title: string
  description: string
  type: "career" | "business" | "course"
}

export function AIRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRecommendations = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/get-recommendations")
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations")
      }
      const data = await response.json()
      setRecommendations(data)
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecommendations()
  }, []) //Fixed: Added empty dependency array to only run on mount

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Recommendations</h2>
        <Button onClick={fetchRecommendations} disabled={loading}>
          {loading ? "Loading..." : "Refresh"}
        </Button>
      </div>
      {recommendations.map((recommendation) => (
        <Card key={recommendation.id}>
          <CardHeader>
            <CardTitle>{recommendation.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{recommendation.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Type: {recommendation.type}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

