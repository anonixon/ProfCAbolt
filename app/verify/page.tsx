"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function VerifyPage() {
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const email = searchParams.get("email")
    if (email) {
      setEmail(decodeURIComponent(email))
    }
  }, [searchParams])

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: "signup",
      })

      if (error) throw error

      toast({
        title: "Verification successful",
        description: "Your account has been verified. You can now log in.",
      })
      router.push("/login")
    } catch (error) {
      console.error("Error verifying account:", error)
      toast({
        title: "Verification failed",
        description: error.message || "An error occurred during verification. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-[350px] text-center">
        <div className="mb-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2ZPW5VYKwbX0LhPf6oiQGPeHEhX3wO.png"
            alt="ProfCA Logo"
            width={120}
            height={120}
            className="mx-auto"
          />
          <p className="mt-4 text-lg font-medium text-primary">Think Creatively</p>
          <p className="mt-2 text-sm text-muted-foreground">
            A professional leadership institution focusing on critical thinking and problem solving expertise
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Verify Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Please check your email ({email}) for the verification code and enter it below.
            </p>
            <form onSubmit={handleVerify}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Input
                    id="verificationCode"
                    placeholder="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                </div>
              </div>
              <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code? Check your spam folder or contact support.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

