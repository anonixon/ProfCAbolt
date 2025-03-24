import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

export async function POST(req: Request) {
  try {
    const { userId, action } = await req.json()

    // Update user progress in the database
    const { data, error } = await supabase.from("user_progress").upsert({ user_id: userId, [action]: true })

    if (error) throw error

    // Fetch user's current progress
    const { data: progressData, error: progressError } = await supabase
      .from("user_progress")
      .select("*")
      .eq("user_id", userId)
      .single()

    if (progressError) throw progressError

    // Generate personalized recommendations based on user progress
    const prompt = `Given the following user progress, provide personalized recommendations for next steps:

${JSON.stringify(progressData, null, 2)}

Return the recommendations as a JSON array of objects, each containing a 'title' and 'description' property.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const recommendations = JSON.parse(result.text)

    return NextResponse.json({ progress: progressData, recommendations })
  } catch (error) {
    console.error("Error updating user progress:", error)
    return NextResponse.json({ error: "Failed to update user progress" }, { status: 500 })
  }
}

