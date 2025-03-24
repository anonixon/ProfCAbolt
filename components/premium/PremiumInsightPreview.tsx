"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface PremiumInsightPreviewProps {
  title: string
  previewContent: string
  fullContent: string
}

export function PremiumInsightPreview({ title, previewContent, fullContent }: PremiumInsightPreviewProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-yellow-500" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <p>{previewContent}</p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <p className="text-sm text-muted-foreground">Upgrade to Premium to unlock full insights</p>
        <Button
          asChild
          className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
        >
          <Link href="/pricing">Unlock Premium Access</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

