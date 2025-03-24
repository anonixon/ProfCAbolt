"use client"

import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, Target } from "lucide-react"
import { motion } from "framer-motion"

interface ProgressCardProps {
  level: number
  xp: number
  nextLevelXp: number
  streak: number
}

export function ProgressCard({ level, xp, nextLevelXp, streak }: ProgressCardProps) {
  const progress = (xp / nextLevelXp) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Your Progress
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Level {level}</p>
              <div className="text-xs text-muted-foreground">
                {xp} / {nextLevelXp} XP to next level
              </div>
            </div>
            <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-bold">{streak} day streak!</span>
            </motion.div>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="flex flex-col items-center">
              <Target className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-xl font-bold">{level}</div>
              <div className="text-xs text-muted-foreground">Current Level</div>
            </div>
            <div className="flex flex-col items-center">
              <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
              <div className="text-xl font-bold">{xp}</div>
              <div className="text-xs text-muted-foreground">Total XP</div>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-8 w-8 text-purple-500 mb-2" />
              <div className="text-xl font-bold">{streak}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

