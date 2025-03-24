"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  xp: number
}

export function AdaptiveChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [userXP, setUserXP] = useState(0)

  useEffect(() => {
    fetchChallenges()
  }, [])

  const fetchChallenges = async () => {
    try {
      const response = await fetch("/api/get-challenges")
      if (!response.ok) {
        throw new Error("Failed to fetch challenges")
      }
      const data = await response.json()
      setChallenges(data)
    } catch (error) {
      console.error("Error fetching challenges:", error)
    }
  }

  const completeChallenge = async (challengeId: string, xp: number) => {
    try {
      const response = await fetch("/api/complete-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      })
      if (!response.ok) {
        throw new Error("Failed to complete challenge")
      }
      setUserXP(userXP + xp)
      // Fetch new challenges after completion
      fetchChallenges()
    } catch (error) {
      console.error("Error completing challenge:", error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Adaptive Challenges</h2>
      <div className="flex items-center space-x-2">
        <span>XP:</span>
        <Progress value={userXP % 100} className="w-[100px]" />
        <span>{userXP}</span>
      </div>
      {challenges.map((challenge) => (
        <Card key={challenge.id}>
          <CardHeader>
            <CardTitle>{challenge.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{challenge.description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Difficulty: {challenge.difficulty} | XP: {challenge.xp}
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => completeChallenge(challenge.id, challenge.xp)}>Complete Challenge</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

