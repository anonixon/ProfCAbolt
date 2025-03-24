import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

// Mock function to simulate web scraping
async function scrapeJobTrends() {
  // In a real application, this would be replaced with actual web scraping logic
  return [
    { date: "2023-01", jobCount: 1000 },
    { date: "2023-02", jobCount: 1200 },
    { date: "2023-03", jobCount: 1100 },
    { date: "2023-04", jobCount: 1300 },
    { date: "2023-05", jobCount: 1500 },
    { date: "2023-06", jobCount: 1400 },
  ]
}

export async function GET() {
  try {
    const jobTrends = await scrapeJobTrends()

    const prompt = `Based on current tech industry trends, generate 5 innovative business ideas for new and upcoming services within the tech industry. For each idea, provide a title, a brief description, and a potential score out of 10. Format the response as a JSON array of objects with 'title', 'description', and 'potentialScore' properties.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const businessIdeas = JSON.parse(result.text)

    return NextResponse.json({ jobTrends, businessIdeas })
  } catch (error) {
    console.error("Error generating job trends and business ideas:", error)
    return NextResponse.json({ error: "Failed to generate job trends and business ideas" }, { status: 500 })
  }
}

