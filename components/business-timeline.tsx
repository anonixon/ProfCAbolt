"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ClipboardList, Lightbulb, Target, TrendingUp, Users, CheckCircle2, ArrowRight } from "lucide-react"

interface TimelineStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  details: string[]
}

const steps: TimelineStep[] = [
  {
    id: "personal-appraisal",
    title: "Personal Appraisal",
    description: "Understand your strengths and potential",
    icon: ClipboardList,
    details: [
      "Assessment of current skills and expertise",
      "Identification of key strengths and passions",
      "Analysis of professional experience",
      "Evaluation of available resources",
    ],
  },
  {
    id: "idea-matrix",
    title: "Idea Matrix",
    description: "Generate and organize your business ideas",
    icon: Lightbulb,
    details: [
      "Brainstorming potential business concepts",
      "Mapping ideas to market opportunities",
      "Evaluating feasibility and requirements",
      "Prioritizing promising concepts",
    ],
  },
  {
    id: "ability-matrix",
    title: "Ability Matrix",
    description: "Match your skills with opportunities",
    icon: Target,
    details: [
      "Skill-to-opportunity mapping",
      "Identifying skill gaps",
      "Development planning",
      "Resource allocation strategy",
    ],
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    description: "Understand your target market",
    icon: TrendingUp,
    details: [
      "Market size and potential assessment",
      "Competitor analysis",
      "Target audience identification",
      "Market entry strategy development",
    ],
  },
  {
    id: "community-feedback",
    title: "Community Feedback",
    description: "Get insights from experts and peers",
    icon: Users,
    details: [
      "Expert mentorship and guidance",
      "Peer review and suggestions",
      "Industry networking",
      "Collaborative refinement",
    ],
  },
]

export function BusinessTimeline() {
  const [activeStep, setActiveStep] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  useEffect(() => {
    const observers = steps.map((step, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveStep(index)
            }
          })
        },
        { threshold: 0.5 },
      )

      const element = document.getElementById(step.id)
      if (element) observer.observe(element)

      return { observer, element }
    })

    return () => {
      observers.forEach(({ observer, element }) => {
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-background py-20" ref={containerRef}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-4 border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">{steps[activeStep].title}</h2>
          <p className="text-muted-foreground">{steps[activeStep].description}</p>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Timeline Beam */}
          <div className="absolute left-8 top-0 w-1 h-full bg-gray-200 dark:bg-gray-800">
            <motion.div className="absolute top-0 left-0 w-full bg-blue-500" style={{ height: beamHeight }} />
          </div>

          {/* Timeline Steps */}
          <div className="space-y-24 py-10">
            {steps.map((step, index) => (
              <div key={step.id} id={step.id} className="relative pl-20">
                {/* Timeline Marker */}
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                    index <= activeStep
                      ? "bg-blue-500 ring-4 ring-blue-200 dark:ring-blue-900"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-card rounded-lg p-6 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <step.icon className="w-8 h-8 text-blue-500" />
                    <div>
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {index === steps.length - 1 && (
                    <div className="mt-8">
                      <Button asChild size="lg" className="btn-primary">
                        <Link href="/signup">
                          Start Your Business Journey Now
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

