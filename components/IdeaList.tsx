"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/useAuth"
import { useIdeas } from "@/hooks/useIdeas"
import { Loader2 } from "lucide-react"

export function IdeaList() {
  const { user } = useAuth()
  const { data: ideas, isLoading, error } = useIdeas(user?.id || "")

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error loading ideas: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    )
  }

  if (!ideas || ideas.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">No ideas found. Start by creating your first idea!</div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Your Ideas</h2>
      {ideas.map((idea) => (
        <Card key={idea.id}>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>Submitted on {new Date(idea.created_at || "").toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{idea.description}</p>
            <Badge>{idea.category}</Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

