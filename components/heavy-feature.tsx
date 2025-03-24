"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeavyFeature() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Feature Showcase</CardTitle>
        <CardDescription>Explore our powerful career planning tools</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Resume Builder</h3>
            <p className="text-sm text-muted-foreground">Create professional resumes tailored to your target roles</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Interview Prep</h3>
            <p className="text-sm text-muted-foreground">Practice with AI-powered mock interviews</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Skill Assessment</h3>
            <p className="text-sm text-muted-foreground">Identify your strengths and areas for improvement</p>
          </div>
          <div className="rounded-lg border p-4">
            <h3 className="text-lg font-medium">Job Matching</h3>
            <p className="text-sm text-muted-foreground">Find opportunities that align with your career goals</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

