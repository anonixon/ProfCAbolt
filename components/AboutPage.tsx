"use client"

import { motion } from "framer-motion"
import { ArrowRight, Target, Rocket } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden aurora-bg">
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-background/80" />
        <div className="container relative z-20 flex h-full flex-col items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
          >
            Transforming Ideas into Reality
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[600px] text-muted-foreground md:text-xl"
          >
            We're a team of passionate individuals dedicated to helping entrepreneurs and innovators succeed in their
            ventures.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8"
          >
            <Button size="lg" className="group">
              Learn More About Us
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-12 md:grid-cols-2"
          >
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our Mission</h3>
              <p className="text-muted-foreground">
                Empowering individuals and businesses by transforming skills, experiences, and passions into viable
                career and business opportunities through AI-driven insights, interactive frameworks, and structured
                guidance. We aim to simplify decision-making and provide the tools needed for sustainable success.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading AI-powered platform that revolutionizes business and career development, enabling
                users worldwide to make informed, data-driven decisions that drive growth, innovation, and long-term
                success.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final Section - Using content from HomePage */}
      <section className="relative py-20 overflow-hidden">
        {/* Spotlight Background */}
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            {/* Beam 1 */}
            <div className="absolute h-[2px] w-[200px] animate-beam-left bg-gradient-to-r from-transparent via-white to-transparent top-1/4 -left-48" />
            <div className="absolute h-[2px] w-[200px] animate-beam-right bg-gradient-to-r from-transparent via-white to-transparent top-1/3 -right-48" />

            {/* Beam 2 */}
            <div className="absolute h-[2px] w-[300px] animate-beam-left-slow bg-gradient-to-r from-transparent via-white to-transparent top-2/4 -left-48" />
            <div className="absolute h-[2px] w-[300px] animate-beam-right-slow bg-gradient-to-r from-transparent via-white to-transparent bottom-1/3 -right-48" />

            {/* Beam 3 */}
            <div className="absolute h-[2px] w-[250px] animate-beam-left-slower bg-gradient-to-r from-transparent via-white to-transparent bottom-1/4 -left-48" />
            <div className="absolute h-[2px] w-[250px] animate-beam-right-slower bg-gradient-to-r from-transparent via-white to-transparent top-2/3 -right-48" />

            {/* Radial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" />
          </div>
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Bring Your Ideas to Life?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of innovators who have found success with Think Creatively.
            </p>
            <Button asChild size="lg" className="btn-primary shadow-md">
              <Link href="/pricing">
                Start Your Journey Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

