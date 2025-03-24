"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface BusinessIdea {
  title: string
  description: string
  keyPoints: string[]
}

export default function BusinessDetailsPage() {
  const router = useRouter()
  const { id } = useParams()
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessIdea | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBusinessIdea = async () => {
      try {
        setIsLoading(true)
        const storedIdeas = localStorage.getItem("businessIdeas")
        if (!storedIdeas) {
          throw new Error("No business ideas found")
        }

        const ideas = JSON.parse(storedIdeas)
        const idea = ideas[Number.parseInt(id as string, 10)]

        if (!idea) {
          throw new Error("Business idea not found")
        }

        setSelectedBusiness(idea)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load business idea")
        console.error("Error loading business idea:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessIdea()
  }, [id])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="mb-4">{error}</p>
          <Button asChild>
            <Link href="/business-results">Back to Results</Link>
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

  if (!selectedBusiness) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/business-results"
        className="inline-flex items-center text-sm font-medium text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4 icon-color" />
        Back to Results
      </Link>
      <h1 className="text-4xl font-bold mb-6">{selectedBusiness.title}</h1>
      <p className="mb-6">{selectedBusiness.description}</p>

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
              {selectedBusiness.keyPoints.map((point, index) => (
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
              <li>Conduct market research to validate the demand for your business idea.</li>
              <li>Develop a detailed business plan, including financial projections and marketing strategies.</li>
              <li>Identify potential funding sources or bootstrap options for your startup.</li>
              <li>Create a minimum viable product (MVP) to test with potential customers.</li>
              <li>Seek mentorship or join a startup accelerator program for guidance and support.</li>
            </ol>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => window.print()} className="mr-4">
          Print Details
        </Button>
        <Button variant="outline" asChild>
          <Link href="/business-results">Back to All Ideas</Link>
        </Button>
      </div>
    </div>
  )
}

