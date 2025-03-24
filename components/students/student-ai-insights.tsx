"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, TrendingUp, Target } from "lucide-react"

export default function StudentAIInsights() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [insights, setInsights] = useState({
    strengths: [
      "Strong analytical thinking",
      "Excellent communication skills",
      "Adaptable to new technologies",
      "Problem-solving mindset",
    ],
    opportunities: [
      "Growing demand for data analysis skills",
      "Remote work opportunities in tech sector",
      "Increasing need for digital marketing specialists",
      "Expansion of healthcare technology roles",
    ],
    recommendations: [
      "Consider pursuing certification in data science",
      "Join industry networking groups to expand connections",
      "Develop portfolio showcasing analytical projects",
      "Explore internship opportunities in growing sectors",
    ],
  })

  const generateNewInsights = async () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setInsights({
        strengths: [
          "Creative problem-solving approach",
          "Strong teamwork and collaboration skills",
          "Technical aptitude with quick learning ability",
          "Effective time management",
        ],
        opportunities: [
          "Emerging AI and machine learning roles",
          "Growth in sustainability-focused positions",
          "Increasing demand for UX/UI specialists",
          "Expansion in cybersecurity sector",
        ],
        recommendations: [
          "Consider specialized courses in AI or machine learning",
          "Build a personal brand highlighting your unique skills",
          "Participate in hackathons to demonstrate problem-solving",
          "Connect with mentors in your target industry",
        ],
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">AI Career Insights</h2>
        <Button onClick={generateNewInsights} disabled={isGenerating}>
          {isGenerating ? "Generating..." : "Generate New Insights"}
        </Button>
      </div>

      <Tabs defaultValue="strengths" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strengths">
            <Lightbulb className="mr-2 h-4 w-4" />
            Strengths
          </TabsTrigger>
          <TabsTrigger value="opportunities">
            <TrendingUp className="mr-2 h-4 w-4" />
            Opportunities
          </TabsTrigger>
          <TabsTrigger value="recommendations">
            <Target className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="strengths">
          <Card>
            <CardHeader>
              <CardTitle>Your Career Strengths</CardTitle>
              <CardDescription>AI-identified strengths based on your profile and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insights.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Leverage these strengths in your career planning and interviews
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="opportunities">
          <Card>
            <CardHeader>
              <CardTitle>Market Opportunities</CardTitle>
              <CardDescription>Current and emerging opportunities aligned with your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insights.opportunities.map((opportunity, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span>
                    {opportunity}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              These opportunities represent growing areas in the current job market
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Personalized Recommendations</CardTitle>
              <CardDescription>AI-generated suggestions to enhance your career prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {insights.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Consider implementing these recommendations in your career development plan
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { StudentAIInsights }

