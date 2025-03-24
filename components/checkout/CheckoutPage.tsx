"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Shield, CreditCard } from "lucide-react"
import type { PricingPlan } from "@/types/pricing"
import { useAuth } from "@/hooks/useAuth"

interface CheckoutPageProps {
  plan: PricingPlan
}

export function CheckoutPage({ plan }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Here you would integrate with your payment processor
      // For now, we'll simulate a successful payment
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful!",
        description: "Welcome to " + plan.name + "!",
      })
      router.push("/checkout/success")
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Complete Your Purchase</CardTitle>
          <CardDescription>You're purchasing the {plan.name} plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between mb-2">
              <span>{plan.name}</span>
              <span>{plan.price}/month</span>
            </div>
            <p className="text-sm text-muted-foreground">Billed monthly</p>
          </div>

          <form onSubmit={handlePayment} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Information</label>
              <Input placeholder="Card number" required />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="MM/YY" required />
                <Input placeholder="CVC" required />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Name on card</label>
              <Input placeholder="Full name" required />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Your payment info is secure and encrypted</span>
            </div>

            <Button type="submit" className="w-full" disabled={isProcessing}>
              {isProcessing ? (
                "Processing..."
              ) : (
                <span className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Pay {plan.price}
                </span>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <p className="text-sm text-muted-foreground">✓ 30-day money-back guarantee</p>
          <p className="text-sm text-muted-foreground">✓ Cancel anytime</p>
        </CardFooter>
      </Card>
    </div>
  )
}

