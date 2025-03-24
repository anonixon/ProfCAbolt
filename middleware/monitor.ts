import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import logger from "@/lib/logger"

export function withMonitoring(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const startTime = Date.now()
    const requestId = crypto.randomUUID()

    // Log request details
    logger.info("API Request", {
      requestId,
      method: req.method,
      url: req.url,
      userAgent: req.headers.get("user-agent"),
    })

    try {
      const response = await handler(req)

      // Log response time
      const duration = Date.now() - startTime
      logger.info("API Response", {
        requestId,
        status: response.status,
        duration: `${duration}ms`,
      })

      return response
    } catch (error) {
      // Log errors
      logger.error(error, `API Error (${requestId})`)

      return NextResponse.json(
        {
          error: "Internal server error",
          requestId,
        },
        { status: 500 },
      )
    }
  }
}

