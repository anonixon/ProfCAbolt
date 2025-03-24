import { z } from "zod"
import { type NextRequest, NextResponse } from "next/server"

/**
 * Validates a request against a Zod schema
 */
export async function validateRequest<T>(
  req: NextRequest,
  schema: z.Schema<T>,
): Promise<{ success: true; data: T } | { success: false; error: string }> {
  try {
    // For GET requests, validate query parameters
    if (req.method === "GET") {
      const url = new URL(req.url)
      const queryParams: Record<string, string> = {}

      url.searchParams.forEach((value, key) => {
        queryParams[key] = value
      })

      const validatedData = schema.parse(queryParams)
      return { success: true, data: validatedData }
    }

    // For POST/PUT/PATCH requests, validate JSON body
    const body = await req.json().catch(() => ({}))
    const validatedData = schema.parse(body)
    return { success: true, data: validatedData }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", "),
      }
    }

    return { success: false, error: "Invalid request data" }
  }
}

/**
 * Helper to handle validation errors in API routes
 */
export function handleValidationError(result: { success: false; error: string }) {
  return NextResponse.json({ error: result.error }, { status: 400 })
}

