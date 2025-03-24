"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  reward: number
  completed: boolean
}

interface ChallengesCardProps {
  challenges: Challenge[]
  onClaimReward: (challengeId: string) => void
}

export function ChallengesCard({ challenges, onClaimReward }: ChallengesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          Daily Challenges
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{challenge.title}</h4>
                  <p className="text-sm text-muted-foreground">{challenge.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">+{challenge.reward} XP</span>
                  {challenge.completed && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
              </div>
              <Progress value={challenge.progress} className="h-2" />
              {challenge.completed && challenge.progress === 100 && (
                <Button size="sm" className="w-full" onClick={() => onClaimReward(challenge.id)}>
                  Claim Reward
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

