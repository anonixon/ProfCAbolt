import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const matrixData = await req.json()
    const { skills, experiences, hobbies, knowledge, pastIdeas } = matrixData

    const prompt = `Based on the following information, generate 5 innovative ${
      req.headers.get("X-Idea-Type") === "career" ? "career paths" : "business ideas"
    }:

Skills: ${skills.join(", ")}
Experiences: ${experiences.join(", ")}
Hobbies & Interests: ${hobbies.join(", ")}
Knowledge: ${knowledge.join(", ")}
Past Ideas: ${pastIdeas.join(", ")}

Consider current market trends, future-proofing, and the user's unique combination of skills and interests. Provide a brief description for each idea.

Format the response as a JSON array of strings, each containing the idea title and a short description.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const ideas = JSON.parse(result.text)

    return NextResponse.json({ ideas })
  } catch (error) {
    console.error("Error generating ideas:", error)
    return NextResponse.json({ error: "Failed to generate ideas" }, { status: 500 })
  }
}

