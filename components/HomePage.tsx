"use client"

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, GraduationCap, Lightbulb, TrendingUp, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { FAQ } from "@/components/FAQ"

export function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="relative isolate">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Transform Your Career
              <br />
              With ProfCA
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Discover your perfect career path and unlock business opportunities with our AI-powered platform.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/register"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="text-sm font-semibold leading-6 text-primary"
              >
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
            </div>
          </div>
      </main>
  );
}

