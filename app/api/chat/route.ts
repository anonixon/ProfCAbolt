import { NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const prompt = `You are an AI career assistant. Help the user explore career options and provide guidance based on their skills and interests. Current conversation:
${messages.map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`).join("\n")}

Based on the conversation above, provide a helpful and informative response that guides the user in their career journey.`

    const result = await generateText({
      model: openai("gpt-4-turbo"),
      prompt: prompt,
    })

    return NextResponse.json({ message: result.text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}

