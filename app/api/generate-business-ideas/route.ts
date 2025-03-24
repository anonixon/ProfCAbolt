import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { BusinessFormData, BusinessIdea } from "@/types/forms"
import logger from "@/lib/logger"
import { headers } from "next/headers"

export async function POST(req: Request) {
  try {
    // Validate content type
    const contentType = headers().get("content-type")
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ error: "Content-Type must be application/json" }, { status: 415 })
    }

    const data: BusinessFormData = await req.json()

    // Validate input data
    if (!data.skills || !data.experience || !data.interests || !data.learning || !data.ideas) {
      logger.warn("Missing required fields in business idea generation")
      return NextResponse.json(
        {
          error: "All fields are required",
          details: "Please fill in all required fields",
        },
        { status: 400 },
      )
    }

    logger.info("Generating business ideas", { userId: data.userId })

    const prompt = `Based on the following information, generate 5 unique and innovative business ideas:
    Skills: ${data.skills}
    Experience & Certifications: ${data.experience}
    Interests & Hobbies: ${data.interests}
    Skills to Learn: ${data.learning}
    Previously Considered Ideas: ${data.ideas}

    For each business idea, provide:
    1. A catchy title
    2. A brief description (2-3 sentences)
    3. Three key points about why this business would be successful

    Format the response as a JSON array of objects with 'title', 'description', and 'keyPoints' (array) properties.
    Make sure the ideas are practical, achievable, and aligned with the person's skills and interests.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 2000,
    })

    if (!result || !result.text) {
      throw new Error("Failed to generate response from AI model")
    }

    let businessIdeas: BusinessIdea[]
    try {
      businessIdeas = JSON.parse(result.text)

      // Validate the parsed data structure
      if (!Array.isArray(businessIdeas)) {
        throw new Error("Invalid response format: expected an array")
      }

      if (
        !businessIdeas.every(
          (idea) =>
            typeof idea === "object" &&
            idea !== null &&
            typeof idea.title === "string" &&
            typeof idea.description === "string" &&
            Array.isArray(idea.keyPoints) &&
            idea.keyPoints.every((point) => typeof point === "string"),
        )
      ) {
        throw new Error("Invalid idea format in response")
      }
    } catch (parseError) {
      logger.error(parseError, "AI response parsing error")
      return NextResponse.json(
        {
          error: "Failed to parse AI response",
          details: parseError instanceof Error ? parseError.message : "Unknown parsing error",
        },
        { status: 500 },
      )
    }

    logger.info("Successfully generated business ideas", { count: businessIdeas.length })

    return NextResponse.json({
      ideas: businessIdeas,
      status: "success",
    })
  } catch (error) {
    logger.error(error, "Business idea generation error")
    return NextResponse.json(
      {
        error: "Failed to generate business ideas",
        details: error instanceof Error ? error.message : "An unexpected error occurred",
        timestamp: new Date().toISOString(),
      },
      {
        status: 500,
      },
    )
  }
}

