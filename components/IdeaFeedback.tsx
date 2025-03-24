"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"
import { Star } from "lucide-react"

interface Idea {
  id: string
  title: string
  description: string
  category: string
  user_id: string
}

export function IdeaFeedback() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null)
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchIdeasForFeedback()
  }, [])

  const fetchIdeasForFeedback = async () => {
    const { data, error } = await supabase.from("ideas").select("*").order("created_at", { ascending: false }).limit(10)

    if (error) {
      console.error("Error fetching ideas:", error)
    } else {
      setIdeas(data)
      setCurrentIdea(data[0] || null)
    }
  }

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { data, error } = await supabase.from("feedback").insert({
        user_id: user.id,
        idea_id: currentIdea?.id,
        feedback,
        rating,
      })

      if (error) throw error

      toast({
        title: "Feedback submitted successfully",
        description: "Thank you for your input!",
      })

      // Move to the next idea
      const currentIndex = ideas.findIndex((idea) => idea.id === currentIdea?.id)
      setCurrentIdea(ideas[currentIndex + 1] || null)
      setFeedback("")
      setRating(0)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!currentIdea) {
    return <div>No more ideas to review at the moment.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{currentIdea.title}</CardTitle>
        <CardDescription>Category: {currentIdea.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentIdea.description}</p>
        <form onSubmit={handleSubmitFeedback} className="space-y-4">
          <div className="flex justify-center mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Provide your feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" disabled={isLoading || rating === 0}>
            {isLoading ? "Submitting..." : "Submit Feedback"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

