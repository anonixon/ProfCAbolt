import { type NextRequest, NextResponse } from "next/server"

// Simple in-memory store for rate limiting
// Note: This will be reset on server restart and doesn't work across multiple instances
const ipRequestCounts = new Map<string, { count: number; timestamp: number }>()

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute in milliseconds
const MAX_REQUESTS_PER_WINDOW = 100 // Maximum requests per window

export function rateLimit(req: NextRequest): NextResponse | { status: number } {
  try {
    const ip = req.ip || "unknown"
    const now = Date.now()

    // Get current count for this IP
    const currentData = ipRequestCounts.get(ip) || { count: 0, timestamp: now }

    // Reset count if outside the window
    if (now - currentData.timestamp > RATE_LIMIT_WINDOW) {
      ipRequestCounts.set(ip, { count: 1, timestamp: now })
      return { status: 200 }
    }

    // Increment count
    currentData.count++
    ipRequestCounts.set(ip, currentData)

    // Check if over limit
    if (currentData.count > MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json({ error: "Too many requests, please try again later." }, { status: 429 })
    }

    return { status: 200 }
  } catch (error) {
    console.error("Rate limit error:", error)
    // In case of error, allow the request to proceed
    return { status: 200 }
  }
}

