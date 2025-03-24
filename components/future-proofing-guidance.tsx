"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GuidanceItem {
  title: string
  description: string
  actionItems: string[]
}

export function FutureProofingGuidance() {
  const [businessGuidance, setBusinessGuidance] = useState<GuidanceItem[]>([])
  const [careerGuidance, setCareerGuidance] = useState<GuidanceItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchGuidance = async (type: "business" | "career") => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/future-proofing-guidance?type=${type}`)
      if (!response.ok) {
        throw new Error("Failed to fetch guidance")
      }
      const data = await response.json()
      if (type === "business") {
        setBusinessGuidance(data.guidance)
      } else {
        setCareerGuidance(data.guidance)
      }
    } catch (error) {
      console.error(`Error fetching ${type} guidance:`, error)
    } finally {
      setIsLoading(false)
    }
  }

  const renderGuidance = (guidance: GuidanceItem[]) => (
    <div className="space-y-4">
      {guidance.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">{item.description}</p>
            <h4 className="font-semibold mb-1">Action Items:</h4>
            <ul className="list-disc pl-5">
              {item.actionItems.map((action, actionIndex) => (
                <li key={actionIndex}>{action}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <Tabs defaultValue="business">
      <TabsList>
        <TabsTrigger value="business">Business Guidance</TabsTrigger>
        <TabsTrigger value="career">Career Guidance</TabsTrigger>
      </TabsList>
      <TabsContent value="business">
        <Button onClick={() => fetchGuidance("business")} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Business Guidance"}
        </Button>
        {renderGuidance(businessGuidance)}
      </TabsContent>
      <TabsContent value="career">
        <Button onClick={() => fetchGuidance("career")} disabled={isLoading}>
          {isLoading ? "Loading..." : "Get Career Guidance"}
        </Button>
        {renderGuidance(careerGuidance)}
      </TabsContent>
    </Tabs>
  )
}

