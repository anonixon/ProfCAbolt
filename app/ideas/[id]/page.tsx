"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabase-client"
import { FeedbackForm } from "@/components/FeedbackForm"

interface Idea {
  id: string
  title: string
  description: string
  category: string
  analysis: {
    strengths: string[]
    challenges: string[]
    opportunities: string[]
    improvements: string[]
    nextSteps: string[]
  }
}

interface Feedback {
  id: string
  user_id: string
  content: string
  created_at: string
}

export default function IdeaDetailPage() {
  const { id } = useParams()
  const [idea, setIdea] = useState<Idea | null>(null)
  const [feedback, setFeedback] = useState<Feedback[]>([])

  useEffect(() => {
    fetchIdeaAndFeedback()
  }, []) // Removed unnecessary dependency 'id'

  const fetchIdeaAndFeedback = async () => {
    try {
      const { data: ideaData, error: ideaError } = await supabase.from("ideas").select("*").eq("id", id).single()

      if (ideaError) throw ideaError

      const { data: feedbackData, error: feedbackError } = await supabase
        .from("feedback")
        .select("*")
        .eq("idea_id", id)
        .order("created_at", { ascending: false })

      if (feedbackError) throw feedbackError

      setIdea(ideaData)
      setFeedback(feedbackData)
    } catch (error) {
      console.error("Error fetching idea and feedback:", error)
    }
  }

  if (!idea) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{idea.title}</h1>
      <Badge>{idea.category}</Badge>
      <p className="mt-4 mb-6">{idea.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>AI Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2">Strengths</h3>
            <ul className="list-disc pl-5 mb-4">
              {idea.analysis.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Challenges</h3>
            <ul className="list-disc pl-5 mb-4">
              {idea.analysis.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Opportunities</h3>
            <ul className="list-disc pl-5 mb-4">
              {idea.analysis.opportunities.map((opportunity, index) => (
                <li key={index}>{opportunity}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Suggestions for Improvement</h3>
            <ul className="list-disc pl-5 mb-4">
              {idea.analysis.improvements.map((improvement, index) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>
            <h3 className="font-semibold mb-2">Next Steps</h3>
            <ul className="list-disc pl-5">
              {idea.analysis.nextSteps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackForm ideaId={idea.id} onFeedbackSubmitted={fetchIdeaAndFeedback} />
            <div className="mt-6 space-y-4">
              {feedback.map((item) => (
                <div key={item.id} className="border-b pb-4">
                  <p>{item.content}</p>
                  <p className="text-sm text-gray-500 mt-1">{new Date(item.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

