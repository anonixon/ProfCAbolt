"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function IdeaMatrix() {
  const [ideas, setIdeas] = useState<string[]>([])
  const [newIdea, setNewIdea] = useState("")

  const addIdea = () => {
    if (newIdea.trim()) {
      setIdeas([...ideas, newIdea.trim()])
      setNewIdea("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Idea Matrix</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Input placeholder="Enter a new idea" value={newIdea} onChange={(e) => setNewIdea(e.target.value)} />
            <Button onClick={addIdea} className="mt-2">
              Add Idea
            </Button>
          </div>
          <Textarea placeholder="Your skills, experiences, hobbies, interests, and knowledge" rows={5} />
          <div>
            <h3 className="font-semibold mb-2">Your Ideas:</h3>
            <ul className="list-disc pl-5">
              {ideas.map((idea, index) => (
                <li key={index}>{idea}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

