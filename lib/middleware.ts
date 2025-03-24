import { type NextRequest, NextResponse } from "next/server"

type MiddlewareFunction = (request: NextRequest) => Promise<NextResponse> | NextResponse

export function createMiddleware(handler: MiddlewareFunction) {
  return async function middleware(request: NextRequest) {
    try {
      return await handler(request)
    } catch (error) {
      console.error("Middleware error:", error)
      return NextResponse.next()
    }
  }
}

