"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"

interface CustomMilestone {
  id: string
  title: string
  completed: boolean
}

export function CustomMilestones() {
  const [milestones, setMilestones] = useState<CustomMilestone[]>([])
  const [newMilestone, setNewMilestone] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchCustomMilestones()
  }, [])

  const fetchCustomMilestones = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase.from("milestones").select("*").eq("user_id", user.id).eq("type", "custom")

    if (error) {
      console.error("Error fetching custom milestones:", error)
    } else {
      setMilestones(data)
    }
  }

  const addCustomMilestone = async () => {
    if (!newMilestone.trim()) return

    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    const { data, error } = await supabase
      .from("milestones")
      .insert({
        user_id: user.id,
        title: newMilestone,
        type: "custom",
        completed: false,
      })
      .select()

    if (error) {
      console.error("Error adding custom milestone:", error)
      toast({
        title: "Error",
        description: "Failed to add custom milestone. Please try again.",
        variant: "destructive",
      })
    } else {
      setMilestones([...milestones, data[0]])
      setNewMilestone("")
      toast({
        title: "Success",
        description: "Custom milestone added successfully.",
      })
    }
  }

  const toggleMilestone = async (id: string) => {
    const { data, error } = await supabase
      .from("milestones")
      .update({ completed: !milestones.find((m) => m.id === id)?.completed })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Error updating milestone:", error)
      toast({
        title: "Error",
        description: "Failed to update milestone. Please try again.",
        variant: "destructive",
      })
    } else {
      setMilestones(milestones.map((m) => (m.id === id ? data[0] : m)))
      toast({
        title: "Success",
        description: "Milestone updated successfully.",
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Custom Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={newMilestone}
              onChange={(e) => setNewMilestone(e.target.value)}
              placeholder="Enter new milestone"
            />
            <Button onClick={addCustomMilestone}>Add</Button>
          </div>
          <ul className="space-y-2">
            {milestones.map((milestone) => (
              <li key={milestone.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={milestone.completed}
                  onChange={() => toggleMilestone(milestone.id)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className={milestone.completed ? "line-through text-gray-500" : ""}>{milestone.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

