"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, GraduationCap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

interface CareerIdea {
  title: string
  description: string
  keyPoints: string[]
}

export default function CareerResultsPage() {
  const router = useRouter()
  const [rankedCareers, setRankedCareers] = useState<number[]>([])
  const [careerIdeas, setCareerIdeas] = useState<CareerIdea[]>([])

  useEffect(() => {
    const ideas = router.query?.ideas
    if (ideas) {
      setCareerIdeas(JSON.parse(ideas as string))
    }
  }, [router.query])

  const handleRank = (index: number) => {
    setRankedCareers((prev) => {
      const newRanking = prev.filter((i) => i !== index)
      return [index, ...newRanking]
    })
  }

  const handleViewDetails = () => {
    if (rankedCareers.length > 0) {
      router.push(`/career-details/${rankedCareers[0]}`)
    }
  }

  if (careerIdeas.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/career-form"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4 icon-color" />
        Back to Form
      </Link>
      <h1 className="text-4xl font-bold mb-6">Your Career Opportunities</h1>
      <p className="mb-6">
        Based on your input, here are some AI-generated career paths tailored to your skills and interests. Rank them by
        clicking on the stars, with your top choice having the most stars.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {careerIdeas.map((idea, index) => (
          <Card key={index} className={rankedCareers[0] === index ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 icon-color" />
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
                        rankedCareers.indexOf(index) < star ? "text-gray-300" : "text-yellow-400 fill-current"
                      }`}
                      onClick={() => handleRank(index)}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">Rank: {rankedCareers.indexOf(index) + 1 || "-"}</span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={handleViewDetails} disabled={rankedCareers.length === 0} className="mr-4">
          View Top Career Details
        </Button>
        <Button variant="outline" asChild>
          <Link href="/career-form">Explore More Careers</Link>
        </Button>
      </div>
    </div>
  )
}

