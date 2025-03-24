"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase-client"
import { DeepseekTest } from "@/components/DeepseekTest"

export default function AdminDashboardPage() {
  const [userCount, setUserCount] = useState(0)
  const [ideaCount, setIdeaCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const checkAdminStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        router.push("/admin/login")
        return
      }

      const { data: adminData } = await supabase.from("admin_users").select("*").eq("user_id", user.id).single()

      if (!adminData) {
        router.push("/admin/login")
      }
    }

    const fetchStats = async () => {
      const { count: users } = await supabase.from("profiles").select("*", { count: "exact", head: true })

      const { count: ideas } = await supabase.from("saved_ideas").select("*", { count: "exact", head: true })

      setUserCount(users || 0)
      setIdeaCount(ideas || 0)
    }

    checkAdminStatus()
    fetchStats()
  }, [router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{userCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Ideas</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{ideaCount}</p>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <section className="p-4 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">API Connections</h2>
          <DeepseekTest />
        </section>
      </div>
    </div>
  )
}

