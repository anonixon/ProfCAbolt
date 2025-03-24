"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Clock, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import type { SpecialOffer } from "@/types/premium"

interface SpecialOfferBannerProps {
  offer: SpecialOffer
}

export function SpecialOfferBanner({ offer }: SpecialOfferBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Alert className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
      <Clock className="h-4 w-4 text-purple-500" />
      <div className="flex-1">
        <AlertTitle className="text-purple-500">{offer.title}</AlertTitle>
        <AlertDescription className="mt-1">
          <p className="text-muted-foreground mb-2">{offer.description}</p>
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-500">{offer.discount}% OFF</span>
            <Button asChild size="sm" className="bg-purple-500 hover:bg-purple-600">
              <Link href="/pricing">Claim Now</Link>
            </Button>
          </div>
        </AlertDescription>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="ml-2 text-muted-foreground hover:text-foreground"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Dismiss offer</span>
      </Button>
    </Alert>
  )
}

