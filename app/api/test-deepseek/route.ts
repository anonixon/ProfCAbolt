import { NextResponse } from "next/server"

export async function GET() {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          status: "error",
          message: "DEEPSEEK_API_KEY is not set",
        },
        { status: 500 },
      )
    }

    // Test API connection
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: "Test connection" }],
      }),
    })

    if (!response.ok) {
      throw new Error(`Deepseek API error: ${response.statusText}`)
    }

    return NextResponse.json({
      status: "success",
      message: "Deepseek API connection successful",
    })
  } catch (error) {
    console.error("Deepseek API test error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

