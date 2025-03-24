import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")

  if (type !== "business" && type !== "career") {
    return NextResponse.json({ error: "Invalid guidance type" }, { status: 400 })
  }

  try {
    const prompt = `Provide 3 key pieces of future-proofing guidance for ${type === "business" ? "entrepreneurs" : "career seekers"} in the current market. For each piece of guidance, include:
1. A title
2. A brief description
3. 3 actionable items

Format the response as a JSON array of objects, each with 'title', 'description', and 'actionItems' properties.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const guidance = JSON.parse(result.text)

    return NextResponse.json({ guidance })
  } catch (error) {
    console.error(`Error generating ${type} guidance:`, error)
    return NextResponse.json({ error: `Failed to generate ${type} guidance` }, { status: 500 })
  }
}

