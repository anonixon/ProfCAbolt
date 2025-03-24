"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MatrixData {
  skills: string[]
  experiences: string[]
  hobbies: string[]
  knowledge: string[]
  pastIdeas: string[]
}

export function IdeaCreatorMatrix() {
  const [activeStep, setActiveStep] = useState(1)
  const [matrixData, setMatrixData] = useState<MatrixData>({
    skills: [],
    experiences: [],
    hobbies: [],
    knowledge: [],
    pastIdeas: [],
  })
  const [currentInput, setCurrentInput] = useState("")
  const [generatedIdeas, setGeneratedIdeas] = useState<string[]>([])

  const handleAddItem = (category: keyof MatrixData) => {
    if (currentInput.trim()) {
      setMatrixData((prev) => ({
        ...prev,
        [category]: [...prev[category], currentInput.trim()],
      }))
      setCurrentInput("")
    }
  }

  const handleNextStep = async () => {
    if (activeStep < 5) {
      setActiveStep(activeStep + 1)
    } else {
      // Generate ideas using AI
      try {
        const response = await fetch("/api/generate-ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(matrixData),
        })
        if (!response.ok) {
          throw new Error("Failed to generate ideas")
        }
        const data = await response.json()
        setGeneratedIdeas(data.ideas)
      } catch (error) {
        console.error("Error generating ideas:", error)
      }
    }
  }

  const renderMatrixStep = (step: number, title: string, category: keyof MatrixData) => (
    <Card className={activeStep === step ? "block" : "hidden"}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder={`Enter ${category}`}
            />
            <Button onClick={() => handleAddItem(category)}>Add</Button>
          </div>
          <ul className="list-disc pl-5">
            {matrixData[category].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleNextStep}>{step === 5 ? "Generate Ideas" : "Next"}</Button>
      </CardFooter>
    </Card>
  )

  return (
    <Tabs defaultValue="business">
      <TabsList>
        <TabsTrigger value="business">Business Ideas</TabsTrigger>
        <TabsTrigger value="career">Career Paths</TabsTrigger>
      </TabsList>
      <TabsContent value="business">
        <div className="space-y-4">
          {renderMatrixStep(1, "Skills Matrix", "skills")}
          {renderMatrixStep(2, "Experience Matrix", "experiences")}
          {renderMatrixStep(3, "Hobbies & Interests Matrix", "hobbies")}
          {renderMatrixStep(4, "Knowledge Matrix", "knowledge")}
          {renderMatrixStep(5, "Past Business Ideas", "pastIdeas")}
          {generatedIdeas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Business Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {generatedIdeas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
      <TabsContent value="career">
        <div className="space-y-4">
          {renderMatrixStep(1, "Skills Matrix", "skills")}
          {renderMatrixStep(2, "Experience Matrix", "experiences")}
          {renderMatrixStep(3, "Hobbies & Interests Matrix", "hobbies")}
          {renderMatrixStep(4, "Knowledge Matrix", "knowledge")}
          {renderMatrixStep(5, "Past Career Considerations", "pastIdeas")}
          {generatedIdeas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Career Paths</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5">
                  {generatedIdeas.map((idea, index) => (
                    <li key={index}>{idea}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>
    </Tabs>
  )
}

