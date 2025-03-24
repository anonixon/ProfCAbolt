"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { CareerPath } from "@/types/career"
import { useSubscription } from "@/hooks/useSubscription"

export function CareerPathMatcher({
  careerPaths,
  onSelect,
}: {
  careerPaths: CareerPath[]
  onSelect: (path: CareerPath) => void
}) {
  const { planType } = useSubscription()
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null)

  const handleSelect = (path: CareerPath) => {
    setSelectedPath(path)
    onSelect(path)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recommended Career Paths</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {careerPaths.map((path) => (
          <Card
            key={path.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedPath?.id === path.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleSelect(path)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{path.title}</CardTitle>
                <Badge variant={path.marketDemand === "high" ? "default" : "secondary"}>
                  {path.marketDemand} demand
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{path.description}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Match Score</span>
                  <span className="font-medium">{path.matchScore}%</span>
                </div>
                <Progress value={path.matchScore} className="h-2" />
              </div>
              {planType === "pro" || planType === "business" ? (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Salary Range</p>
                  <p className="text-muted-foreground">
                    {path.salaryRange.currency}
                    {path.salaryRange.min.toLocaleString()} - {path.salaryRange.currency}
                    {path.salaryRange.max.toLocaleString()}
                  </p>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {path.requiredSkills.slice(0, 3).map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
                {path.requiredSkills.length > 3 && (
                  <Badge variant="outline">+{path.requiredSkills.length - 3} more</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

