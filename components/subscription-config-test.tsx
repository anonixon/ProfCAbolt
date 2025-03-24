"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

export function SubscriptionConfigTest() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const { toast } = useToast()

  const testConfig = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/test-subscription-config")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to test subscription configuration")
      }

      setResult(data)
      toast({
        title: "Success",
        description: "Subscription configuration is valid",
      })
    } catch (error) {
      console.error("Error testing subscription config:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Configuration Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConfig} disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Test Configuration
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

