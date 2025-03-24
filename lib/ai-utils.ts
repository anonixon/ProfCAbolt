import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import logger from "@/lib/logger"

type AIModelOptions = {
  temperature?: number
  maxTokens?: number
  model?: string
}

/**
 * Generates an AI response using a consistent pattern
 */
export async function generateAIResponse(prompt: string, options: AIModelOptions = {}) {
  try {
    const { temperature = 0.7, maxTokens = 1000, model = "gpt-4-turbo" } = options

    logger.info("Generating AI response", { prompt: prompt.substring(0, 100) + "..." })

    const result = await generateText({
      model: openai(model),
      prompt,
      temperature,
      maxTokens,
    })

    try {
      // Try to parse as JSON if possible
      return JSON.parse(result.text)
    } catch (e) {
      // Return as text if not valid JSON
      return result.text
    }
  } catch (error) {
    logger.error("AI generation error:", error)

    // Return a fallback response
    if (process.env.NODE_ENV === "production") {
      return {
        error: true,
        message: "Unable to generate AI response. Please try again later.",
      }
    } else {
      throw new Error(`Failed to generate AI response: ${error instanceof Error ? error.message : String(error)}`)
    }
  }
}

/**
 * Safely processes AI requests with error handling
 */
export async function safeAIRequest<T>(callback: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await callback()
  } catch (error) {
    logger.error("AI request failed:", error)
    return fallback
  }
}

