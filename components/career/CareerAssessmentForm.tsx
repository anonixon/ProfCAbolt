"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import type { CareerAssessment } from "@/types/career"
import { useAuth } from "@/hooks/useAuth"

export function CareerAssessmentForm({ onComplete }: { onComplete: (assessment: CareerAssessment) => void }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [assessment, setAssessment] = useState<Partial<CareerAssessment>>({
    currentSkills: [],
    experience: {
      years: 0,
      roles: [],
      industries: [],
    },
    certifications: [],
    interests: [],
    aspirations: {
      shortTerm: "",
      longTerm: "",
      preferredIndustries: [],
      workStyle: [],
    },
  })

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/career-assessment?userId=${user?.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessment),
      })

      if (!response.ok) throw new Error("Failed to submit assessment")

      const data = await response.json()
      onComplete(assessment as CareerAssessment)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit career assessment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader>
              <CardTitle>Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skills">Current Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={assessment.currentSkills?.join(", ")}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      currentSkills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={assessment.experience?.years}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      experience: { ...assessment.experience!, years: Number.parseInt(e.target.value) },
                    })
                  }
                />
              </div>
            </CardContent>
          </>
        )
      case 2:
        return (
          <>
            <CardHeader>
              <CardTitle>Interests & Aspirations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shortTerm">Short-term Career Goal</Label>
                <Textarea
                  id="shortTerm"
                  value={assessment.aspirations?.shortTerm}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      aspirations: { ...assessment.aspirations!, shortTerm: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="longTerm">Long-term Career Goal</Label>
                <Textarea
                  id="longTerm"
                  value={assessment.aspirations?.longTerm}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      aspirations: { ...assessment.aspirations!, longTerm: e.target.value },
                    })
                  }
                />
              </div>
            </CardContent>
          </>
        )
      case 3:
        return (
          <>
            <CardHeader>
              <CardTitle>Work Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="industries">Preferred Industries (comma-separated)</Label>
                <Input
                  id="industries"
                  value={assessment.aspirations?.preferredIndustries.join(", ")}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      aspirations: {
                        ...assessment.aspirations!,
                        preferredIndustries: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="workStyle">Work Style Preferences (comma-separated)</Label>
                <Input
                  id="workStyle"
                  value={assessment.aspirations?.workStyle.join(", ")}
                  onChange={(e) =>
                    setAssessment({
                      ...assessment,
                      aspirations: {
                        ...assessment.aspirations!,
                        workStyle: e.target.value.split(",").map((s) => s.trim()),
                      },
                    })
                  }
                />
              </div>
            </CardContent>
          </>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      {renderStep()}
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
          Previous
        </Button>
        <Button
          onClick={() => {
            if (step === 3) {
              handleSubmit()
            } else {
              setStep(step + 1)
            }
          }}
        >
          {step === 3 ? "Submit" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  )
}

