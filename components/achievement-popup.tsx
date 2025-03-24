"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy } from "lucide-react"

interface AchievementPopupProps {
  achievement: string
  onClose: () => void
}

export function AchievementPopup({ achievement, onClose }: AchievementPopupProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-4 rounded-lg shadow-lg flex items-center space-x-2"
        >
          <Trophy className="w-6 h-6" />
          <div>
            <p className="font-bold">Achievement Unlocked!</p>
            <p>{achievement}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

