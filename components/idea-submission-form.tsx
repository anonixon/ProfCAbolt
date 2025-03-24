"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"

const categories = ["Tech Startup", "E-commerce", "Service Business", "Career Path", "Other"]

export function IdeaSubmissionForm() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [visibility, setVisibility] = useState("public")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { data, error } = await supabase.from("saved_ideas").insert({
        user_id: user.id,
        title,
        description,
        type: category,
        visibility,
      })

      if (error) throw error

      // Update XP
      const response = await fetch("/api/update-xp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, xpGained: 50, action: "submit_idea" }),
      })

      if (!response.ok) throw new Error("Failed to update XP")

      const result = await response.json()

      toast({
        title: "Idea submitted successfully",
        description: `You earned 50 XP! ${result.leveledUp ? "You leveled up!" : ""}`,
      })

      if (result.newAchievement) {
        toast({
          title: "Achievement Unlocked!",
          description: result.newAchievement.title,
        })
      }

      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting idea:", error)
      toast({
        title: "Error submitting idea",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Submit Your Idea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input placeholder="Idea Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Textarea
              placeholder="Describe your idea..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Select onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setVisibility} defaultValue="public">
              <SelectTrigger>
                <SelectValue placeholder="Select visibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
                <SelectItem value="invite-only">Invite Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Idea"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

