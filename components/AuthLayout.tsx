"use client"

import type React from "react"

import { useAuth } from "@/hooks/useAuth"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null // The useAuth hook will redirect to login
  }

  return <>{children}</>
}

