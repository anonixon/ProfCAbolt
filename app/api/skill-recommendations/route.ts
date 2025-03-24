import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: Request) {
  try {
    const { currentSkills, targetRole } = await req.json()

    const prompt = `Based on the following current skills and target role, identify skill gaps and recommend learning resources:
    Current Skills: ${JSON.stringify(currentSkills)}
    Target Role: ${targetRole}
    
    Format the response as JSON with the following structure:
    {
      "skillGaps": [{
        "skill": "string",
        "importance": "critical|recommended|optional",
        "resources": [{
          "type": "course|certification|workshop",
          "title": "string",
          "provider": "string",
          "url": "string",
          "duration": "string",
          "cost": number
        }]
      }]
    }`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const recommendations = JSON.parse(result.text)
    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating skill recommendations:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

