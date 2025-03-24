"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase-client"

interface Idea {
  id: string
  title: string
  description: string
  keyPoints: string[]
  type: "business" | "career"
}

export default function CompareIdeasPage() {
  const [user, setUser] = useState<any>(null)
  const [savedIdeas, setSavedIdeas] = useState<Idea[]>([])
  const [selectedIdeas, setSelectedIdeas] = useState<[string, string]>(["", ""])
  const router = useRouter()

  useEffect(() => {
    const fetchUserAndIdeas = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data, error } = await supabase.from("saved_ideas").select("*").eq("user_id", user.id)
        if (data) {
          setSavedIdeas(data)
        }
      } else {
        router.push("/login")
      }
    }
    fetchUserAndIdeas()
  }, [router])

  const handleSelectIdea = (index: number, value: string) => {
    setSelectedIdeas((prev) => {
      const newSelected = [...prev] as [string, string]
      newSelected[index] = value
      return newSelected
    })
  }

  const getSelectedIdea = (id: string) => savedIdeas.find((idea) => idea.id === id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Ideas</h1>
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[0, 1].map((index) => (
          <Select key={index} onValueChange={(value) => handleSelectIdea(index, value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select an idea" />
            </SelectTrigger>
            <SelectContent>
              {savedIdeas.map((idea) => (
                <SelectItem key={idea.id} value={idea.id}>
                  {idea.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {selectedIdeas.map((ideaId, index) => {
          const idea = getSelectedIdea(ideaId)
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{idea ? idea.title : "Select an idea"}</CardTitle>
              </CardHeader>
              <CardContent>
                {idea ? (
                  <>
                    <p className="mb-4">{idea.description}</p>
                    <h3 className="font-semibold mb-2">Key Points:</h3>
                    <ul className="list-disc pl-5">
                      {idea.keyPoints.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                    <p className="mt-4">Type: {idea.type}</p>
                  </>
                ) : (
                  <p>No idea selected</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

