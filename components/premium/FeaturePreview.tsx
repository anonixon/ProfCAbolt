"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lock } from "lucide-react"
import Link from "next/link"
import type { PremiumFeature } from "@/types/premium"

interface FeaturePreviewProps {
  feature: PremiumFeature
}

export function FeaturePreview({ feature }: FeaturePreviewProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <Card className="relative">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {feature.name}
            <Badge variant="secondary" className="ml-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{feature.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogTrigger asChild>
            <Button variant="outline">Preview Feature</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{feature.name}</DialogTitle>
              <DialogDescription>Preview of premium feature</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="relative">
                {feature.previewContent}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background flex items-center justify-center">
                  <div className="text-center p-4">
                    <Lock className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Upgrade to Premium to unlock full access to this feature
                    </p>
                    <Button
                      asChild
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                    >
                      <Link href="/pricing">Upgrade Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          asChild
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
        >
          <Link href="/pricing">Unlock Now</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

