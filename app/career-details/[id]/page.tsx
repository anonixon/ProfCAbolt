"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface CareerIdea {
  title: string
  description: string
  keyPoints: string[]
}

export default function CareerDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const [selectedCareer, setSelectedCareer] = useState<CareerIdea | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCareerIdea = async () => {
      try {
        setIsLoading(true)
        const storedIdeas = localStorage.getItem("careerIdeas")
        if (!storedIdeas) {
          throw new Error("No career ideas found")
        }

        const ideas = JSON.parse(storedIdeas)
        const idea = ideas[Number.parseInt(id as string, 10)]

        if (!idea) {
          throw new Error("Career idea not found")
        }

        setSelectedCareer(idea)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load career idea")
        console.error("Error loading career idea:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCareerIdea()
  }, [id])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="mb-4">{error}</p>
          <Button asChild>
            <Link href="/career-results">Back to Results</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!selectedCareer) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/career-results"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4 icon-color" />
        Back to Results
      </Link>
      <h1 className="text-4xl font-bold mb-6">{selectedCareer.title}</h1>
      <p className="mb-6">{selectedCareer.description}</p>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 icon-color" />
              Key Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              {selectedCareer.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 icon-color" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Research the specific requirements and qualifications for this career path.</li>
              <li>Identify any skills gaps and create a learning plan to address them.</li>
              <li>Look for internships, entry-level positions, or volunteer opportunities in this field.</li>
              <li>Network with professionals in the industry through LinkedIn or industry events.</li>
              <li>Consider additional certifications or education that may boost your career prospects.</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => window.print()} className="mr-4">
          Print Details
        </Button>
        <Button variant="outline" asChild>
          <Link href="/career-results">Back to All Careers</Link>
        </Button>
      </div>
    </div>
  )
}

