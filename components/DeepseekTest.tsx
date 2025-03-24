"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ReloadIcon } from "@radix-ui/react-icons"

export function DeepseekTest() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  const testConnection = async () => {
    try {
      setStatus("loading")
      const response = await fetch("/api/test-deepseek")
      const data = await response.json()

      if (data.status === "success") {
        setStatus("success")
      } else {
        setStatus("error")
      }
      setMessage(data.message)
    } catch (error) {
      setStatus("error")
      setMessage("Failed to test Deepseek API connection")
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={testConnection} disabled={status === "loading"}>
        {status === "loading" && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        Test Deepseek API Connection
      </Button>

      {status !== "idle" && (
        <Alert variant={status === "success" ? "default" : "destructive"}>
          <AlertTitle>{status === "success" ? "Success" : "Error"}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}

