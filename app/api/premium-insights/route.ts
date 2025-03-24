import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const topic = searchParams.get("topic")
  const isPremium = searchParams.get("isPremium") === "true"

  try {
    const prompt = `Generate ${isPremium ? "detailed" : "preview"} insights about ${topic}.
    ${
      isPremium
        ? "Include comprehensive analysis, actionable steps, and expert recommendations."
        : "Provide a brief overview that showcases value but leaves key insights for premium users."
    }
    Format the response as a JSON object with 'title', 'content', and ${isPremium ? "'recommendations'" : "'previewContent'"} properties.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const insights = JSON.parse(result.text)

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error generating insights:", error)
    return NextResponse.json({ error: "Failed to generate insights" }, { status: 500 })
  }
}

