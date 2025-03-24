"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import type { BusinessIdea } from "@/types/forms"

export default function BusinessResultsPage() {
  const router = useRouter()
  const [rankedBusinesses, setRankedBusinesses] = useState<number[]>([])
  const [businessIdeas, setBusinessIdeas] = useState<BusinessIdea[]>([])

  useEffect(() => {
    // Get ideas from localStorage
    const storedIdeas = localStorage.getItem("businessIdeas")
    if (storedIdeas) {
      try {
        const ideas = JSON.parse(storedIdeas)
        setBusinessIdeas(ideas)
      } catch (error) {
        console.error("Error parsing stored ideas:", error)
        router.push("/business-form")
      }
    } else {
      // If no ideas found, redirect back to form
      router.push("/business-form")
    }
  }, [router])

  const handleRank = (index: number) => {
    setRankedBusinesses((prev) => {
      const newRanking = prev.filter((i) => i !== index)
      return [index, ...newRanking]
    })
  }

  const handleViewDetails = () => {
    if (rankedBusinesses.length > 0) {
      router.push(`/business-details/${rankedBusinesses[0]}`)
    }
  }

  if (businessIdeas.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/business-form"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Form
      </Link>
      <h1 className="text-4xl font-bold mb-6">Your Business Ideas</h1>
      <p className="mb-6">
        Based on your input, here are some AI-generated business ideas tailored to your skills and interests. Rank them
        by clicking on the stars, with your top choice having the most stars.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businessIdeas.map((idea, index) => (
          <Card key={index} className={rankedBusinesses[0] === index ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {idea.title}
              </CardTitle>
              <CardDescription>{idea.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-1">
                {idea.keyPoints.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 cursor-pointer ${
                        rankedBusinesses.indexOf(index) < star ? "text-gray-300" : "text-yellow-400 fill-current"
                      }`}
                      onClick={() => handleRank(index)}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">Rank: {rankedBusinesses.indexOf(index) + 1 || "-"}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={handleViewDetails} disabled={rankedBusinesses.length === 0} className="mr-4">
          View Top Business Details
        </Button>
        <Button variant="outline" asChild>
          <Link href="/business-form">Generate New Ideas</Link>
        </Button>
      </div>
    </div>
  )
}

