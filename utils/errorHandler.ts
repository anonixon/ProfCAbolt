import type { AuthError } from "@supabase/supabase-js"

export const errorHandler = (error: unknown): string => {
  // Log the error for debugging
  console.error("Error occurred:", error)

  // Handle Supabase auth errors
  if (error instanceof Error && (error as AuthError).status) {
    const authError = error as AuthError
    return authError.message
  }

  // Handle standard Error objects
  if (error instanceof Error) {
    return error.message
  }

  // Handle string errors
  if (typeof error === "string") {
    return error
  }

  // Handle unknown errors
  return "An unexpected error occurred. Please try again."
}

// Add a named export for handleError as an alias
export const handleError = errorHandler

