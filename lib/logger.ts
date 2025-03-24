const logger = {
  error: (error: Error | unknown, context?: string) => {
    if (error instanceof Error) {
      console.error(`[${context || "ERROR"}]:`, {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
      })
    } else {
      console.error(`[${context || "ERROR"}]:`, error)
    }
  },
  info: (message: string, data?: any) => {
    console.log(`[INFO]: ${message}`, data || "")
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN]: ${message}`, data || "")
  },
}

export default logger

