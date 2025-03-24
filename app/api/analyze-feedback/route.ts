import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { supabase } from "@/lib/supabase-client"

export async function POST(req: Request) {
  try {
    const { ideaId } = await req.json()

    // Fetch reviews for the idea
    const { data: reviews, error } = await supabase.from("peer_reviews").select("review, rating").eq("idea_id", ideaId)

    if (error) throw error

    // Prepare the reviews for AI analysis
    const reviewsText = reviews.map((r) => `Review: ${r.review} (Rating: ${r.rating}/5)`).join("\n")

    const prompt = `Analyze the following peer reviews for a business or career idea and provide a summary of key insights, common themes, and suggestions for improvement:

${reviewsText}

Please format your response as JSON with the following structure:
{
  "summary": "A brief summary of the overall feedback",
  "keyInsights": ["Insight 1", "Insight 2", "Insight 3"],
  "commonThemes": ["Theme 1", "Theme 2", "Theme 3"],
  "suggestionsForImprovement": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
}
`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const analysis = JSON.parse(result.text)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error analyzing feedback:", error)
    return NextResponse.json({ error: "Failed to analyze feedback" }, { status: 500 })
  }
}

