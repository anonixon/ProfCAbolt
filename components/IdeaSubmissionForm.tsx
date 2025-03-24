"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { handleError } from "@/utils/errorHandler"

type IdeaFormData = {
  title: string
  description: string
  category: string
}

export function IdeaSubmissionForm() {
  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    description: "",
    category: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw new Error("Authentication required. Please log in.")
      }

      if (!user) {
        throw new Error("User not authenticated")
      }

      // Validate form data
      if (!formData.title.trim() || !formData.description.trim() || !formData.category) {
        throw new Error("Please fill in all required fields")
      }

      // Analyze the idea using AI
      const analysisResponse = await fetch("/api/analyze-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json()
        throw new Error(errorData.message || "Failed to analyze idea")
      }

      const analysis = await analysisResponse.json()

      // Save the idea and analysis to the database
      const { data: ideaData, error: insertError } = await supabase
        .from("ideas")
        .insert({
          user_id: user.id,
          ...formData,
          analysis,
          created_at: new Date().toISOString(),
        })
        .select()
        .single()

      if (insertError) {
        throw insertError
      }

      if (!ideaData) {
        throw new Error("Failed to create idea")
      }

      toast({
        title: "Success!",
        description: "Your idea has been submitted and analyzed.",
      })

      // Add notification
      await supabase.from("notifications").insert({
        user_id: user.id,
        content: `Your idea "${formData.title}" has been analyzed by AI.`,
        created_at: new Date().toISOString(),
      })

      router.push(`/ideas/${ideaData.id}`)
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        title: "Error submitting idea",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof IdeaFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Idea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Idea Title"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Describe your idea..."
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
              disabled={isLoading}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="social">Social Impact</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !formData.title || !formData.description || !formData.category}
          >
            {isLoading ? "Submitting..." : "Submit Idea"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

