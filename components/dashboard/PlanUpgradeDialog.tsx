"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import type { PlanType } from "@/types/subscription"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PlanUpgradeDialogProps {
  isOpen: boolean
  onClose: () => void
  currentPlan: {
    name: string
    price: string
    type: PlanType
  }
  newPlan: {
    name: string
    price: string
    type: PlanType
    stripePriceId: string
  }
  userId: string
}

export function PlanUpgradeDialog({ isOpen, onClose, currentPlan, newPlan, userId }: PlanUpgradeDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [proratedAmount, setProratedAmount] = useState<number | null>(null)
  const [newRenewalDate, setNewRenewalDate] = useState<string | null>(null)
  const { toast } = useToast()

  const handleUpgrade = async () => {
    try {
      setIsLoading(true)

      if (!userId) {
        throw new Error("User ID is required")
      }

      const response = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPlan,
          newPlan,
          userId,
        }),
      })

      // Log the raw response for debugging
      console.log("Upgrade API response status:", response.status)
      const data = await response.json()
      console.log("Upgrade API response data:", data)

      if (!response.ok) {
        throw new Error(data.error || `Failed to create upgrade session: ${response.status}`)
      }

      const { sessionId, proratedAmount, newRenewalDate } = data

      if (!sessionId) {
        throw new Error("No session ID returned from server")
      }

      setProratedAmount(proratedAmount)
      setNewRenewalDate(newRenewalDate)

      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe failed to load")
      }

      const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
      if (stripeError) {
        throw new Error(stripeError.message || "Stripe checkout failed")
      }
    } catch (error) {
      console.error("Error upgrading plan:", error)

      // More detailed error logging
      if (error instanceof Error) {
        console.error("Error details:", {
          message: error.message,
          stack: error.stack,
          name: error.name,
        })
      } else {
        console.error("Non-Error object thrown:", error)
      }

      toast({
        title: "Subscription Upgrade Failed",
        description:
          error instanceof Error
            ? error.message || "Unknown error occurred"
            : "An unexpected error occurred during plan upgrade. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upgrade Your Plan</DialogTitle>
          <DialogDescription>
            You're upgrading from {currentPlan.name} to {newPlan.name}.
            {proratedAmount !== null && (
              <>
                <p className="mt-2">
                  Based on your remaining balance, your adjusted cost today is £{proratedAmount.toFixed(2)}.
                </p>
                <p className="mt-1">
                  Your billing cycle will reset on {newRenewalDate && new Date(newRenewalDate).toLocaleDateString()}.
                </p>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end space-x-4 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpgrade} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              `Upgrade to ${newPlan.name}`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

