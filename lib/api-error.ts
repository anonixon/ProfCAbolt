export class ApiError extends Error {
  public readonly statusCode: number
  public readonly code: string
  public readonly details?: Record<string, unknown>

  constructor(message: string, statusCode = 500, code = "INTERNAL_SERVER_ERROR", details?: Record<string, unknown>) {
    super(message)
    this.name = "ApiError"
    this.statusCode = statusCode
    this.code = code
    this.details = details

    // Maintains proper stack trace for where our error was thrown
    Error.captureStackTrace(this, ApiError)
  }

  public static badRequest(message: string, code = "BAD_REQUEST", details?: Record<string, unknown>): ApiError {
    return new ApiError(message, 400, code, details)
  }

  public static unauthorized(
    message = "Unauthorized",
    code = "UNAUTHORIZED",
    details?: Record<string, unknown>,
  ): ApiError {
    return new ApiError(message, 401, code, details)
  }

  public static forbidden(message = "Forbidden", code = "FORBIDDEN", details?: Record<string, unknown>): ApiError {
    return new ApiError(message, 403, code, details)
  }

  public static notFound(
    message = "Resource not found",
    code = "NOT_FOUND",
    details?: Record<string, unknown>,
  ): ApiError {
    return new ApiError(message, 404, code, details)
  }

  public static conflict(message: string, code = "CONFLICT", details?: Record<string, unknown>): ApiError {
    return new ApiError(message, 409, code, details)
  }

  public static tooManyRequests(
    message = "Too many requests",
    code = "TOO_MANY_REQUESTS",
    details?: Record<string, unknown>,
  ): ApiError {
    return new ApiError(message, 429, code, details)
  }

  public static internal(
    message = "Internal server error",
    code = "INTERNAL_SERVER_ERROR",
    details?: Record<string, unknown>,
  ): ApiError {
    return new ApiError(message, 500, code, details)
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

export function handleApiError(error: unknown): ApiError {
  if (isApiError(error)) {
    return error
  }

  if (error instanceof Error) {
    return ApiError.internal(error.message)
  }

  return ApiError.internal("An unexpected error occurred")
}

