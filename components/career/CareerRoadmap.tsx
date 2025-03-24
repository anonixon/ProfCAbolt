"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"
import type { CareerRoadmap } from "@/types/career"

export function CareerRoadmap({ roadmap }: { roadmap: CareerRoadmap }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "in-progress":
        return <Clock className="h-5 w-5 text-blue-500" />
      default:
        return <Circle className="h-5 w-5 text-gray-300" />
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Career Roadmap</h2>
      <div className="space-y-4">
        {roadmap.milestones.map((milestone, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {getStatusIcon(milestone.status)}
                  {milestone.title}
                </CardTitle>
                <Badge>{milestone.timeframe}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{milestone.description}</p>
              <div className="space-y-2">
                {milestone.tasks.map((task, taskIndex) => (
                  <div key={taskIndex} className="flex items-center justify-between p-2 rounded-lg bg-muted">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span>{task.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

