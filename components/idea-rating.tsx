"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"
import { Star } from "lucide-react"

interface Idea {
  id: string
  title: string
  description: string
  type: string
  user_id: string
}

export function IdeaRating() {
  const [ideas, setIdeas] = useState<Idea[]>([])
  const [currentIdea, setCurrentIdea] = useState<Idea | null>(null)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    fetchIdeas()
  }, [])

  const fetchIdeas = async () => {
    const { data, error } = await supabase
      .from("saved_ideas")
      .select("*")
      .eq("visibility", "public")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching ideas:", error)
    } else {
      setIdeas(data)
      setCurrentIdea(data[0] || null)
    }
  }

  const handleRating = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { data, error } = await supabase.from("peer_reviews").insert({
        user_id: user.id,
        idea_id: currentIdea?.id,
        rating,
        review,
      })

      if (error) throw error

      // Update XP
      const response = await fetch("/api/update-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, xpGained: 20, action: "submit_review" }),
      })

      if (!response.ok) throw new Error("Failed to update XP")

      const result = await response.json()

      toast({
        title: "Review submitted successfully",
        description: `You earned 20 XP! ${result.leveledUp ? "You leveled up!" : ""}`,
      })

      if (result.newAchievement) {
        toast({
          title: "Achievement Unlocked!",
          description: result.newAchievement.title,
        })
      }

      // Move to the next idea
      const currentIndex = ideas.findIndex((idea) => idea.id === currentIdea?.id)
      setCurrentIdea(ideas[currentIndex + 1] || null)
      setRating(0)
      setReview("")
    } catch (error) {
      console.error("Error submitting review:", error)
      toast({
        title: "Error submitting review",
        description: "Please try again later.",
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{currentIdea.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentIdea.description}</p>
        <div className="flex justify-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`cursor-pointer ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <form onSubmit={handleRating}>
          <Textarea
            placeholder="Write your review..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
          <Button className="w-full mt-4" type="submit" disabled={isLoading || rating === 0}>
            {isLoading ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

