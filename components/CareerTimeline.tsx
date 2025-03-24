import { useRef } from "react"
;('"use client')

import { motion, useScroll, useTransform } from "framer-motion"
import { CheckCircle2 } from "lucide-react"

const steps = [
  {
    id: "personal-assessment",
    title: "Evaluate Your Skills & Strengths",
    description: "AI assesses skills, experience, and career goals.",
    achievements: [
      "Complete AI-powered skills assessment",
      "Identify core strengths and competencies",
      "Define career goals and aspirations",
      "Generate personalized career strengths report",
    ],
  },
  {
    id: "career-paths",
    title: "AI-Matched Career Opportunities",
    description: "AI presents careers that align with user skills, interests, and market demand.",
    achievements: [
      "Discover matching career paths",
      "Analyze job market trends",
      "Review salary expectations",
      "Explore growth potential",
    ],
  },
  {
    id: "skill-development",
    title: "Upskilling & Certification Roadmap",
    description: "AI suggests learning paths and certifications to boost employability.",
    achievements: [
      "Create personalized learning path",
      "Access recommended courses",
      "Track certification progress",
      "Build professional portfolio",
    ],
  },
  {
    id: "career-advancement",
    title: "Grow Your Career & Build Connections",
    description: "Users access mentorship, job opportunities, and networking events.",
    achievements: [
      "Connect with industry mentors",
      "Join professional networks",
      "Access exclusive job opportunities",
      "Participate in networking events",
    ],
  },
]

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section className="relative py-20 bg-slate-950" ref={containerRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Career Development Timeline</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 w-1 h-full bg-slate-800">
            <motion.div className="absolute top-0 left-0 w-full bg-blue-500" style={{ height: beamHeight }} />
          </div>
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={step.id} className="relative pl-20">
                <div
                  className={`absolute left-6 w-4 h-4 rounded-full transform -translate-x-1/2 ${
                    index <= Math.floor(scrollYProgress.get())
                      ? "bg-blue-500 ring-4 ring-blue-200 dark:ring-blue-900"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-slate-900 rounded-lg p-6 shadow-lg border border-slate-800"
                >
                  <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                  <ul className="list-disc pl-5 space-y-1 text-black">
                    {step.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-slate-300">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

