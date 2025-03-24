import { z } from "zod"
import { ApiError } from "./api-error"

export async function validateRequest<T>(schema: z.Schema<T>, data: unknown): Promise<T> {
  try {
    return await schema.parseAsync(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw ApiError.badRequest("Invalid request data", "VALIDATION_ERROR", {
        errors: error.errors,
      })
    }
    throw error
  }
}

export const ideaSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  category: z.enum(["business", "career"]),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
})

export const feedbackSchema = z.object({
  content: z.string().min(1),
  rating: z.number().min(1).max(5),
})

export const userUpdateSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  avatar_url: z.string().url().optional(),
})

export type IdeaInput = z.infer<typeof ideaSchema>
export type FeedbackInput = z.infer<typeof feedbackSchema>
export type UserUpdateInput = z.infer<typeof userUpdateSchema>

