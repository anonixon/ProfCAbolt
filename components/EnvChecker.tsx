"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface EnvVars {
  SUPABASE_URL: string | undefined
  SUPABASE_ANON_KEY: string | undefined
  NEXT_PUBLIC_SUPABASE_URL: string | undefined
  NEXT_PUBLIC_SUPABASE_ANON_KEY: string | undefined
  NEXT_PUBLIC_SITE_URL: string | undefined
  DEEPSEEK_API_KEY: string | undefined
}

export function EnvChecker() {
  const [envVars, setEnvVars] = useState<EnvVars | null>(null)
  const [error, setError] = useState<string | null>(null)

  const checkEnvVars = async () => {
    try {
      const response = await fetch("/api/check-env")
      if (!response.ok) {
        throw new Error("Failed to fetch environment variables")
      }
      const data = await response.json()
      setEnvVars(data)
      setError(null)
    } catch (err) {
      setError("Error checking environment variables")
      console.error(err)
    }
  }

  useEffect(() => {
    checkEnvVars()
  }, [checkEnvVars]) // Added checkEnvVars to the dependency array

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Variables Check</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {envVars && (
          <ul className="space-y-2">
            {Object.entries(envVars).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value || "Not set"}
              </li>
            ))}
          </ul>
        )}
        <Button onClick={checkEnvVars} className="mt-4">
          Refresh
        </Button>
      </CardContent>
    </Card>
  )
}

