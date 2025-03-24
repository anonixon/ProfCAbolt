"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"
import Link from "next/link"

interface CountdownTimerProps {
  expiryDate: string
  title: string
  description: string
  discount: number
}

export function CountdownTimer({ expiryDate, title, description, discount }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(expiryDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiryDate])

  return (
    <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-2 border-purple-500/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-500">
          <Clock className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <div className="grid grid-cols-4 gap-2 mb-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-2xl font-bold text-purple-500">{value}</div>
              <div className="text-xs text-muted-foreground capitalize">{unit}</div>
            </div>
          ))}
        </div>
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-purple-500">{discount}% OFF</span>
        </div>
        <Button asChild className="w-full bg-purple-500 hover:bg-purple-600">
          <Link href="/pricing">Claim Discount Now</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

