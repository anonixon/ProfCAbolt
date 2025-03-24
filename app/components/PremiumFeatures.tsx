"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function PremiumFeatures() {
  const [isPremium, setIsPremium] = useState(false)

  const upgradeToPremium = () => {
    // In a real application, this would initiate the payment process
    setIsPremium(true)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Features</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Advanced AI Insights</span>
            <Switch checked={isPremium} onCheckedChange={() => {}} />
          </div>
          <div className="flex items-center justify-between">
            <span>Personalized Learning Paths</span>
            <Switch checked={isPremium} onCheckedChange={() => {}} />
          </div>
          <div className="flex items-center justify-between">
            <span>Industry Expert Networking</span>
            <Switch checked={isPremium} onCheckedChange={() => {}} />
          </div>
          {!isPremium && <Button onClick={upgradeToPremium}>Upgrade to Premium</Button>}
        </div>
      </CardContent>
    </Card>
  )
}

