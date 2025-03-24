import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { supabase } from "@/lib/supabase-client"
import type { CareerAssessment } from "@/types/career"

export async function POST(req: Request) {
  try {
    const assessment: CareerAssessment = await req.json()
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Store assessment in Supabase
    const { error: dbError } = await supabase
      .from("career_assessments")
      .upsert({ user_id: userId, assessment_data: assessment })

    if (dbError) {
      console.error("Error storing assessment:", dbError)
      return NextResponse.json({ error: "Failed to store assessment" }, { status: 500 })
    }

    // Generate career insights using AI
    const prompt = `Based on the following career assessment, provide detailed career path recommendations:
    ${JSON.stringify(assessment, null, 2)}
    
    Format the response as JSON with the following structure:
    {
      "recommendedPaths": [{
        "title": "Career Title",
        "description": "Career Description",
        "matchScore": 0-100,
        "requiredSkills": [],
        "skillGaps": [],
        "nextSteps": []
      }],
      "marketInsights": {
        "demandLevel": "high|medium|low",
        "growthPotential": "description",
        "salaryRange": { "min": number, "max": number }
      }
    }`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const insights = JSON.parse(result.text)

    // Store insights in Supabase
    const { error: insightsError } = await supabase
      .from("career_insights")
      .upsert({ user_id: userId, insights_data: insights })

    if (insightsError) {
      console.error("Error storing insights:", insightsError)
      return NextResponse.json({ error: "Failed to store insights" }, { status: 500 })
    }

    return NextResponse.json(insights)
  } catch (error) {
    console.error("Error in career assessment:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

