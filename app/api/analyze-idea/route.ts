import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { title, description, category } = await req.json()

    const prompt = `Analyze the following business or career idea:
    Title: ${title}
    Description: ${description}
    Category: ${category}

    Provide a detailed analysis including:
    1. Strengths of the idea
    2. Potential challenges or weaknesses
    3. Market opportunities
    4. Suggestions for improvement
    5. Potential next steps

    Format the response as JSON with the following structure:
    {
      "strengths": ["Strength 1", "Strength 2", ...],
      "challenges": ["Challenge 1", "Challenge 2", ...],
      "opportunities": ["Opportunity 1", "Opportunity 2", ...],
      "improvements": ["Suggestion 1", "Suggestion 2", ...],
      "nextSteps": ["Step 1", "Step 2", ...]
    }`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const analysis = JSON.parse(result.text)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing idea:", error)
    return NextResponse.json({ error: "Failed to analyze idea" }, { status: 500 })
  }
}

