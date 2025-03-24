import { NextResponse } from "next/server"
import logger from "@/lib/logger"

export type ApiHandler<T = any> = (req: Request) => Promise<T>

/**
 * Wraps an API handler with consistent error handling
 */
export async function safeApiHandler(req: Request, handler: ApiHandler<Response>): Promise<Response> {
  try {
    return await handler(req)
  } catch (error) {
    // Log the error
    logger.error("API error:", error)

    // Return a standardized error response
    return NextResponse.json(
      {
        error: "An unexpected error occurred",
        message: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
        path: req.url,
      },
      { status: 500 },
    )
  }
}

/**
 * Creates a safe API route handler with consistent error handling
 */
export function createSafeHandler(handler: ApiHandler<Response>) {
  return async (req: Request) => safeApiHandler(req, handler)
}

export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }
  return response.json();
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  return handleApiResponse(response);
}

