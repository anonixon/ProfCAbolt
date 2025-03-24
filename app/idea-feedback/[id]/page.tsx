"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"

interface FeedbackAnalysis {
  summary: string
  keyInsights: string[]
  commonThemes: string[]
  suggestionsForImprovement: string[]
}

export default function IdeaFeedbackPage() {
  const { id } = useParams()
  const [idea, setIdea] = useState<any>(null)
  const [analysis, setAnalysis] = useState<FeedbackAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchIdeaAndAnalysis()
  }, []) // Removed unnecessary dependency 'id'

  const fetchIdeaAndAnalysis = async () => {
    try {
      // Fetch idea details
      const { data: ideaData, error: ideaError } = await supabase.from("saved_ideas").select("*").eq("id", id).single()

      if (ideaError) throw ideaError
      setIdea(ideaData)

      // Fetch AI analysis
      const response = await fetch("/api/analyze-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ideaId: id }),
      })

      if (!response.ok) throw new Error("Failed to fetch analysis")
      const analysisData = await response.json()
      setAnalysis(analysisData)
    } catch (error) {
      console.error("Error fetching idea and analysis:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!idea || !analysis) {
    return <div>Failed to load idea feedback.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{idea.title} - Feedback Analysis</h1>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{analysis.summary}</p>
        </CardContent>
      </Card>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {analysis.keyInsights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Common Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {analysis.commonThemes.map((theme, index) => (
                <li key={index}>{theme}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Suggestions for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5">
              {analysis.suggestionsForImprovement.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

