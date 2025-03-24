"use client"

import { Suspense, lazy } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Instead of direct imports like:
// import HeavyFeature from '@/components/heavy-feature'
// import AnalyticsDashboard from '@/components/analytics-dashboard'
// import CareerPathVisualizer from '@/components/career-path-visualizer'

// Use lazy loading
const HeavyFeature = lazy(() => import("@/components/heavy-feature"))
const AnalyticsDashboard = lazy(() => import("@/components/analytics-dashboard"))
const CareerPathVisualizer = lazy(() => import("@/components/career-path-visualizer"))

export function LazyHeavyFeature() {
  return (
    <Suspense fallback={<Skeleton className="h-[400px] w-full rounded-md" />}>
      <HeavyFeature />
    </Suspense>
  )
}

export function LazyAnalyticsDashboard() {
  return (
    <Suspense fallback={<Skeleton className="h-[500px] w-full rounded-md" />}>
      <AnalyticsDashboard />
    </Suspense>
  )
}

export function LazyCareerPathVisualizer() {
  return (
    <Suspense fallback={<Skeleton className="h-[600px] w-full rounded-md" />}>
      <CareerPathVisualizer />
    </Suspense>
  )
}

