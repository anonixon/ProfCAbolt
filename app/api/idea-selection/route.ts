import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

interface Idea {
  title: string
  description: string
  keyPoints: string[]
}

interface RankedIdea extends Idea {
  score: number
}

export async function POST(req: Request) {
  try {
    const { ideas, userProfile } = await req.json()

    const prompt = `Given the following user profile and list of ideas, rank and select the top 3 ideas based on the user's strengths, interests, and market viability. Provide a score from 0-100 for each idea.

User Profile:
${JSON.stringify(userProfile, null, 2)}

Ideas:
${JSON.stringify(ideas, null, 2)}

Return the result as a JSON array of objects, each containing the original idea properties (title, description, keyPoints) and an additional 'score' property.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const rankedIdeas: RankedIdea[] = JSON.parse(result.text)

    // Sort ideas by score in descending order
    rankedIdeas.sort((a, b) => b.score - a.score)

    // Select top 3 ideas
    const topIdeas = rankedIdeas.slice(0, 3)

    return NextResponse.json({ topIdeas })
  } catch (error) {
    console.error("Error ranking ideas:", error)
    return NextResponse.json({ error: "Failed to rank ideas" }, { status: 500 })
  }
}

