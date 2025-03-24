"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { CheckCircle2 } from "lucide-react"

interface UpgradeModalProps {
  isOpen: boolean
  onClose: () => void
  formType: "business" | "career"
}

export function UpgradeModal({ isOpen, onClose, formType }: UpgradeModalProps) {
  const router = useRouter()

  const handleUpgrade = () => {
    router.push("/checkout/basic")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Unlock Your Personalized Ideas</DialogTitle>
          <DialogDescription className="pt-2">
            {formType === "business"
              ? "We've analyzed your profile and generated tailored business recommendations just for you!"
              : "We've mapped out your ideal career path based on your unique profile!"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Upgrade to Basic Plan to Access:</h4>
            <ul className="space-y-3">
              {[
                "3 AI-generated personalized ideas",
                "Detailed analysis and insights",
                "Implementation roadmap",
                "Community feedback access",
                "Basic AI-powered recommendations",
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg space-y-2">
            <p className="font-medium text-base">Special Offer</p>
            <p className="text-2xl font-bold">£3.99/month</p>
            <p className="text-sm text-muted-foreground">Cancel anytime during the first 30 days</p>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button onClick={handleUpgrade} className="bg-primary hover:bg-primary/90">
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

