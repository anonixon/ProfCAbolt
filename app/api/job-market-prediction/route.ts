import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const prompt = `Analyze current job market trends and predict future job opportunities and obsolete industries for the next 5-10 years. Provide a summary of:
    1. Top 5 emerging job roles
    2. Top 5 industries at risk of becoming obsolete
    3. Key skills that will be in high demand`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const prediction = JSON.parse(result.text)

    return NextResponse.json(prediction)
  } catch (error) {
    console.error("Error generating job market prediction:", error)
    return NextResponse.json({ error: "Failed to generate job market prediction" }, { status: 500 })
  }
}

