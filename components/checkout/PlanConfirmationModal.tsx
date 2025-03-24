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
import { Shield, Star } from "lucide-react"
import type { PricingPlan } from "@/types/pricing"

interface PlanConfirmationModalProps {
  plan: PricingPlan | null
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  onChangePlan: () => void
}

export function PlanConfirmationModal({ plan, isOpen, onClose, onConfirm, onChangePlan }: PlanConfirmationModalProps) {
  if (!plan) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-400" />
            You're One Step Away from Unlocking Your Future!
          </DialogTitle>
          <DialogDescription>
            You've selected the {plan.name} plan. Great choice! Here's what you'll get:
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm font-medium">Price: {plan.price}/month</p>
            <p className="text-xs text-muted-foreground mt-1">✓ 30-day money-back guarantee</p>
            <p className="text-xs text-muted-foreground">✓ Cancel anytime</p>
          </div>
        </div>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button onClick={onConfirm} className="w-full">
            Continue with {plan.name}
          </Button>
          <Button variant="outline" onClick={onChangePlan} className="w-full">
            Change Plan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

