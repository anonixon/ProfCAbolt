"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface JobTrend {
  date: string
  jobCount: number
}

interface BusinessIdea {
  title: string
  description: string
  potentialScore: number
}

export function JobTrendsAnalysis() {
  const [jobTrends, setJobTrends] = useState<JobTrend[]>([])
  const [businessIdeas, setBusinessIdeas] = useState<BusinessIdea[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/job-trends-analysis")
      if (!response.ok) {
        throw new Error("Failed to fetch job trends and business ideas")
      }
      const data = await response.json()
      setJobTrends(data.jobTrends)
      setBusinessIdeas(data.businessIdeas)
    } catch (error) {
      console.error("Error fetching job trends and business ideas:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [fetchData]) // Added fetchData to dependencies

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job Trends in Tech</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={jobTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="jobCount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Future Business Ideas in Tech</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {businessIdeas.map((idea, index) => (
              <li key={index} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-lg">{idea.title}</h3>
                <p className="text-sm text-gray-600">{idea.description}</p>
                <p className="text-sm font-medium mt-1">Potential Score: {idea.potentialScore}/10</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Button onClick={fetchData} disabled={isLoading}>
        {isLoading ? "Updating..." : "Refresh Data"}
      </Button>
    </div>
  )
}

