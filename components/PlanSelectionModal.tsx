"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Briefcase, GraduationCap } from "lucide-react"
import { updatePlanType } from "@/lib/actions/update-plan-type"
import type { PlanType } from "@/types/user"

interface PlanSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  userId: string
}

export function PlanSelectionModal({ isOpen, onClose, userId }: PlanSelectionModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handlePlanSelection = async (planType: PlanType) => {
    setIsLoading(true)
    try {
      const result = await updatePlanType(userId, planType)
      if (result.success) {
        onClose()
      } else {
        console.error("Failed to update plan type")
      }
    } catch (error) {
      console.error("Error selecting plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Your Path</DialogTitle>
          <DialogDescription>
            Select the path that best aligns with your goals. This choice will determine which features you can access.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="h-auto p-4"
            onClick={() => handlePlanSelection("business")}
            disabled={isLoading}
          >
            <div className="flex flex-col items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <div className="text-lg font-semibold">Business Creator</div>
              <p className="text-sm text-muted-foreground">Transform your ideas into successful businesses</p>
            </div>
          </Button>
          <Button
            variant="outline"
            className="h-auto p-4"
            onClick={() => handlePlanSelection("career")}
            disabled={isLoading}
          >
            <div className="flex flex-col items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <div className="text-lg font-semibold">Career Developer</div>
              <p className="text-sm text-muted-foreground">Discover and pursue your ideal career path</p>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

