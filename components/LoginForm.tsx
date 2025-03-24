"use client"

import { Checkbox } from "@/components/ui/checkbox"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { SocialAuth } from "@/components/SocialAuth"
import { supabase } from "@/lib/supabase"
import { Eye, EyeOff } from "lucide-react"
// Remove the duplicate import of handleError
// import { handleError } from "@/utils/errorHandler"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!email || !password) {
        throw new Error("Please enter both email and password")
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        // Handle specific auth errors
        if (signInError.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password")
        }
        throw signInError
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred"
      console.error("Login error:", error)
      setError(errorMessage)
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
              Keep me logged in
            </label>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          <Button className="w-full mt-4" type="submit" disabled={isLoading || !email || !password}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <div className="mt-4">
          <SocialAuth />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href="/signup" className="text-sm text-primary hover:underline">
          Don't have an account? Sign up
        </Link>
        <Link href="/reset-password" className="text-sm text-primary hover:underline">
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  )
}

