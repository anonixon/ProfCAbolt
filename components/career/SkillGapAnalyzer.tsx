"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import type { SkillGap } from "@/types/career"
import { useSubscription } from "@/hooks/useSubscription"

export function SkillGapAnalyzer({
  currentSkills,
  targetRole,
}: {
  currentSkills: string[]
  targetRole: string
}) {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([])
  const [loading, setLoading] = useState(true)
  const { planType } = useSubscription()

  useEffect(() => {
    const fetchSkillGaps = async () => {
      try {
        const response = await fetch("/api/skill-recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentSkills, targetRole }),
        })

        if (!response.ok) throw new Error("Failed to fetch skill recommendations")

        const data = await response.json()
        setSkillGaps(data.skillGaps)
      } catch (error) {
        console.error("Error fetching skill gaps:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchSkillGaps()
  }, [currentSkills, targetRole])

  const getBadgeVariant = (importance: string) => {
    switch (importance) {
      case "critical":
        return "destructive"
      case "recommended":
        return "default"
      default:
        return "secondary"
    }
  }

  if (loading) {
    return <div>Loading skill analysis...</div>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {skillGaps.map((gap) => (
          <Card key={gap.skill}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{gap.skill}</CardTitle>
                <Badge variant={getBadgeVariant(gap.importance)}>{gap.importance}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {planType === "free" ? (
                  <p className="text-muted-foreground">
                    Upgrade to access detailed learning resources and recommendations
                  </p>
                ) : (
                  <div className="space-y-2">
                    {gap.resources.map((resource, index) => (
                      <div key={index} className="flex items-start justify-between p-2 rounded-lg bg-muted">
                        <div>
                          <p className="font-medium">{resource.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {resource.provider} • {resource.duration}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

