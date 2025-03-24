import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { skills, experience, interests, learning, careers } = await req.json()

    const prompt = `Based on the following information, generate 5 unique and promising career paths:
    Skills: ${skills}
    Experience & Certifications: ${experience}
    Interests & Hobbies: ${interests}
    Skills to Learn: ${learning}
    Previously Considered Careers: ${careers}

    For each career path, provide:
    1. A job title
    2. A brief description of the role
    3. Three key points about the career

    Format the response as a JSON array of objects, each with 'title', 'description', and 'keyPoints' properties.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const careerIdeas = JSON.parse(result.text)

    return NextResponse.json({ ideas: careerIdeas })
  } catch (error) {
    console.error("Error generating career ideas:", error)
    return NextResponse.json({ error: "Failed to generate career ideas" }, { status: 500 })
  }
}

