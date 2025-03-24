import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { supabase } from "@/lib/supabase-client"
import type { CareerPath } from "@/types/career"

export async function POST(req: Request) {
  try {
    const { selectedPath, userId }: { selectedPath: CareerPath; userId: string } = await req.json()

    if (!userId || !selectedPath) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 })
    }

    // Get user's assessment data
    const { data: assessmentData } = await supabase
      .from("career_assessments")
      .select("assessment_data")
      .eq("user_id", userId)
      .single()

    // Generate detailed roadmap using AI
    const prompt = `Create a detailed career roadmap for transitioning into ${
      selectedPath.title
    } based on the following assessment:
    ${JSON.stringify(assessmentData, null, 2)}
    
    Format the response as JSON with the following structure:
    {
      "roadmap": {
        "shortTerm": [{
          "milestone": "string",
          "timeframe": "string",
          "tasks": ["string"],
          "resources": ["string"]
        }],
        "mediumTerm": [...],
        "longTerm": [...]
      },
      "skillDevelopment": {
        "prioritySkills": ["string"],
        "learningResources": [{
          "skill": "string",
          "resources": [{
            "title": "string",
            "type": "course|certification|workshop",
            "provider": "string",
            "url": "string"
          }]
        }]
      }
    }`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    const roadmap = JSON.parse(result.text)

    // Store roadmap in Supabase
    const { error: dbError } = await supabase
      .from("career_roadmaps")
      .upsert({ user_id: userId, path_id: selectedPath.id, roadmap_data: roadmap })

    if (dbError) {
      console.error("Error storing roadmap:", dbError)
      return NextResponse.json({ error: "Failed to store roadmap" }, { status: 500 })
    }

    return NextResponse.json(roadmap)
  } catch (error) {
    console.error("Error generating career roadmap:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

