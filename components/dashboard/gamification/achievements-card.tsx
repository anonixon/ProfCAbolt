"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Medal } from "lucide-react"
import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  completed: boolean
  progress?: number
  total?: number
}

interface AchievementsCardProps {
  achievements: Achievement[]
}

export function AchievementsCard({ achievements }: AchievementsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="h-5 w-5 text-yellow-500" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <TooltipProvider key={achievement.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative"
                  >
                    <Badge
                      variant={achievement.completed ? "default" : "secondary"}
                      className="w-full h-full p-4 flex flex-col items-center gap-2 cursor-help"
                    >
                      <span className="text-2xl" role="img" aria-label={achievement.title}>
                        {achievement.icon}
                      </span>
                      <span className="text-xs text-center font-medium">{achievement.title}</span>
                      {achievement.progress !== undefined && (
                        <div className="text-[10px] text-muted-foreground">
                          {achievement.progress}/{achievement.total}
                        </div>
                      )}
                    </Badge>
                    {achievement.completed && (
                      <div className="absolute -top-1 -right-1">
                        <Medal className="h-4 w-4 text-yellow-500" />
                      </div>
                    )}
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

