"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import { useSession } from "next-auth/react"
import type { Idea } from "@/types/idea"
import { addNotification } from "@/lib/notifications"

interface Props {
  idea: Idea
}

const FeedbackForm: React.FC<Props> = ({ idea }) => {
  const router = useRouter()
  const { data: session } = useSession()
  const [feedback, setFeedback] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!session?.user?.id) {
      // Handle case where user is not logged in
      return
    }

    const ideaData = {
      user_id: session.user.id,
      idea_id: idea.id,
      feedback,
    }

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ideaData),
      })

      if (!res.ok) {
        throw new Error(`Error! status: ${res.status}`)
      }

      await addNotification(ideaData.user_id, `New feedback received for your idea "${idea.title}".`)

      setFeedback("")
      router.push(`/ideas/${idea.id}`)
    } catch (error) {
      console.error("Error submitting feedback:", error)
      // Handle error appropriately, e.g., display an error message
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback here..."
      />
      <button type="submit">Submit Feedback</button>
    </form>
  )
}

export default FeedbackForm

