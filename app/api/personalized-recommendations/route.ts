import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { supabase } from "@/lib/supabase-client"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    // Fetch user profile and saved ideas
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

    const { data: savedIdeas } = await supabase.from("saved_ideas").select("*").eq("user_id", userId)

    // Generate personalized recommendations using AI
    const prompt = `Based on the following user profile and saved ideas, generate 3 personalized recommendations for career or business opportunities:

User Profile:
${JSON.stringify(profile, null, 2)}

Saved Ideas:
${JSON.stringify(savedIdeas, null, 2)}

Provide recommendations in the following format:
[
  {
    "title": "Recommendation Title",
    "description": "Brief description of the recommendation",
    "reason": "Why this recommendation is suitable for the user"
  },
  ...
]`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const recommendations = JSON.parse(result.text)

    return NextResponse.json(recommendations)
  } catch (error) {
    console.error("Error generating personalized recommendations:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}

