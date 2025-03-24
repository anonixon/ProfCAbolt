"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Lock } from "lucide-react"
import Link from "next/link"
import { ProgressCard } from "@/components/dashboard/gamification/progress-card"
import { PlanSelectionModal } from "@/components/PlanSelectionModal"
import { useAuth } from "@/hooks/useAuth"
import { supabase } from "@/lib/supabase"
import type { Profile } from "@/types/user"

export default function DashboardPage() {
  const { user } = useAuth()
  const [showPlanSelection, setShowPlanSelection] = useState(false)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      if (!user) return

      try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

        if (error) throw error

        setProfile(data)
        if (!data.plan_type) {
          setShowPlanSelection(true)
        }
      } catch (error) {
        console.error("Error loading profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [user])

  if (isLoading) {
    return <div>Loading...</div>
  }

  const isBusinessPlan = profile?.plan_type === "business"
  const isCareerPlan = profile?.plan_type === "career"

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

      {/* Form Selection Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className={!isBusinessPlan && profile?.plan_type ? "opacity-50" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Business Creator</CardTitle>
              {!isBusinessPlan && profile?.plan_type && <Lock className="h-5 w-5 text-muted-foreground" />}
            </div>
            <CardDescription>Transform your ideas into successful businesses</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Use our AI-powered tools to generate and validate your business ideas.
            </p>
            <Button asChild={isBusinessPlan} className="w-full" disabled={!isBusinessPlan && profile?.plan_type}>
              {isBusinessPlan ? (
                <Link href="/business-form" className="flex items-center justify-center">
                  Start Business Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <span>Restricted Access</span>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className={!isCareerPlan && profile?.plan_type ? "opacity-50" : ""}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Career Development</CardTitle>
              {!isCareerPlan && profile?.plan_type && <Lock className="h-5 w-5 text-muted-foreground" />}
            </div>
            <CardDescription>Discover your ideal career path</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get personalized career recommendations based on your skills and interests.
            </p>
            <Button asChild={isCareerPlan} className="w-full" disabled={!isCareerPlan && profile?.plan_type}>
              {isCareerPlan ? (
                <Link href="/career-form" className="flex items-center justify-center">
                  Start Career Assessment
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : (
                <span>Restricted Access</span>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Progress Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <ProgressCard level={1} xp={0} nextLevelXp={100} streak={0} />
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Complete these steps to begin your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm">Choose your path: {profile?.plan_type || "Select Business or Career"}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm">Complete the assessment form</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <p className="text-sm">Get personalized recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Selection Modal */}
      {user && (
        <PlanSelectionModal isOpen={showPlanSelection} onClose={() => setShowPlanSelection(false)} userId={user.id} />
      )}
    </div>
  )
}

