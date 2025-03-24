"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const questions = [
  {
    id: "q1",
    question: "Which area interests you the most?",
    options: ["Technology", "Business", "Creative Arts", "Science", "Social Sciences"],
  },
  {
    id: "q2",
    question: "What's your preferred work environment?",
    options: ["Corporate Office", "Startup", "Remote Work", "Freelancing", "Outdoor"],
  },
  {
    id: "q3",
    question: "What's your strongest skill?",
    options: ["Problem Solving", "Communication", "Creativity", "Leadership", "Technical Skills"],
  },
  // Add more questions as needed
]

export function SkillInterestAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Submit answers to the backend
      submitAssessment()
    }
  }

  const submitAssessment = async () => {
    try {
      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      })
      if (!response.ok) {
        throw new Error("Failed to submit assessment")
      }
      // Handle successful submission (e.g., show results, update user profile)
    } catch (error) {
      console.error("Error submitting assessment:", error)
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Skill & Interest Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-4">{questions[currentQuestion].question}</h3>
        <RadioGroup onValueChange={handleAnswer} value={answers[questions[currentQuestion].id]}>
          {questions[currentQuestion].options.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
          {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  )
}

