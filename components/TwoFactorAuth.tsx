"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/components/ui/use-toast"

export function TwoFactorAuth() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [secret, setSecret] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    checkTwoFactorStatus()
  }, [])

  const checkTwoFactorStatus = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user?.app_metadata?.is_two_factor_enabled) {
      setIsEnabled(true)
    }
  }

  const enableTwoFactor = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.mfa.enroll()
      if (error) throw error

      setSecret(data.secret)
      setQrCode(data.qr_code)
    } catch (error) {
      console.error("Error enabling two-factor authentication:", error)
      toast({
        title: "Error",
        description: "Failed to enable two-factor authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const verifyAndEnable = async () => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.mfa.challenge({ factorId: secret })
      if (error) throw error

      const { data: verifyData, error: verifyError } = await supabase.auth.mfa.verify({
        factorId: secret,
        challenge: data,
        code: verificationCode,
      })
      if (verifyError) throw verifyError

      setIsEnabled(true)
      toast({
        title: "Two-factor authentication enabled",
        description: "Your account is now more secure.",
      })
    } catch (error) {
      console.error("Error verifying two-factor authentication:", error)
      toast({
        title: "Verification failed",
        description: "Failed to verify the code. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const disableTwoFactor = async () => {
    setIsLoading(true)
    try {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: secret })
      if (error) throw error

      setIsEnabled(false)
      toast({
        title: "Two-factor authentication disabled",
        description: "Your account is no longer using two-factor authentication.",
      })
    } catch (error) {
      console.error("Error disabling two-factor authentication:", error)
      toast({
        title: "Error",
        description: "Failed to disable two-factor authentication. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
      </CardHeader>
      <CardContent>
        {isEnabled ? (
          <div>
            <p className="mb-4">Two-factor authentication is currently enabled for your account.</p>
            <Button onClick={disableTwoFactor} disabled={isLoading}>
              {isLoading ? "Disabling..." : "Disable Two-Factor Authentication"}
            </Button>
          </div>
        ) : secret ? (
          <div>
            <p className="mb-4">Scan the QR code with your authenticator app:</p>
            <img src={qrCode || "/placeholder.svg"} alt="QR Code" className="mb-4" />
            <p className="mb-2">Enter the verification code from your app:</p>
            <Input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="mb-4"
            />
            <Button onClick={verifyAndEnable} disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify and Enable"}
            </Button>
          </div>
        ) : (
          <div>
            <p className="mb-4">Two-factor authentication is not enabled for your account.</p>
            <Button onClick={enableTwoFactor} disabled={isLoading}>
              {isLoading ? "Enabling..." : "Enable Two-Factor Authentication"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

