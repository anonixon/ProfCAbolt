import { z } from "zod"
import { createClient } from "@supabase/supabase-js"
import { env } from "../env"

// Initialize Supabase client
const supabase = createClient(env.SUPABASE_URL || "", env.SUPABASE_SERVICE_ROLE_KEY || "")

/**
 * Safely execute a database query with input validation
 */
export async function safeQuery<T, U>({
  schema,
  input,
  query,
}: {
  schema: z.Schema<T>
  input: unknown
  query: (validatedInput: T) => Promise<U>
}): Promise<{ data: U; error: null } | { data: null; error: string }> {
  try {
    // Validate input against schema
    const validatedInput = schema.parse(input)

    // Execute query with validated input
    const result = await query(validatedInput)

    return { data: result, error: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        data: null,
        error: `Validation error: ${error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")}`,
      }
    }

    console.error("Database query error:", error)
    return { data: null, error: "Database query failed" }
  }
}

// Example usage for user profile query
export async function getUserProfile(userId: string) {
  const userIdSchema = z.string().uuid()

  return safeQuery({
    schema: userIdSchema,
    input: userId,
    query: async (validatedUserId) => {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", validatedUserId).single()

      if (error) throw error
      return data
    },
  })
}

