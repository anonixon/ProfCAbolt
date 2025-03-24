"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"

export function SuccessPage() {
  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <CardTitle>Welcome to Think Creatively!</CardTitle>
              <CardDescription>Let's get started on your journey to success.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-semibold">Next Steps:</h3>
          <ol className="list-decimal pl-4 space-y-2">
            <li>Complete your profile for personalized insights</li>
            <li>Set up your AI-powered business plan</li>
            <li>Join our community forum</li>
            <li>Schedule your first mentoring session</li>
          </ol>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/onboarding">Complete Your Profile</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

