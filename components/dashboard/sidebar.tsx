"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { dashboardConfig } from "@/lib/dashboard-config"
import { UserProfileSection } from "@/components/dashboard/user-profile-section"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Lock, PanelLeftClose, PanelLeft, Menu } from "lucide-react"
import { useSubscription } from "@/hooks/useSubscription"
import type { NavSection } from "@/types/dashboard"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

const SIDEBAR_COOKIE_NAME = "sidebar-collapsed"

export function Sidebar() {
  const pathname = usePathname()
  const { hasAccess, planType } = useSubscription()
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Check if we're on the client and get the stored preference
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(SIDEBAR_COOKIE_NAME)
      return stored ? JSON.parse(stored) : false
    }
    return false
  })
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Persist collapsed state
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COOKIE_NAME, JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const toggleCollapsed = useCallback(() => {
    setIsCollapsed((prev) => !prev)
  }, [])

  const renderNavItem = useCallback(
    (item: NavSection["items"][0]) => {
      const Icon = item.icon
      const isLocked = item.feature && !hasAccess(item.feature)

      const content = (
        <Button
          variant={pathname === item.href ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2",
            pathname === item.href && "bg-secondary",
            isCollapsed && "justify-center p-2",
          )}
          asChild
        >
          <Link href={item.href}>
            {Icon && <Icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />}
            {!isCollapsed && <span>{item.title}</span>}
          </Link>
        </Button>
      )

      if (isLocked) {
        return (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="opacity-50">
                  {content}
                  {!isCollapsed && (
                    <Lock className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2" aria-label="Feature locked" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.upgradeMessage || "Upgrade your plan to access this feature"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      if (isCollapsed) {
        return (
          <TooltipProvider key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>{content}</TooltipTrigger>
              <TooltipContent side="right">
                <p>{item.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      }

      return content
    },
    [isCollapsed, pathname, hasAccess],
  )

  const sidebarContent = (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div className={cn("p-6", isCollapsed && "p-4")}>
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2ZPW5VYKwbX0LhPf6oiQGPeHEhX3wO.png"
            alt="Logo"
            className="h-8 w-8 rounded-full"
          />
          {!isCollapsed && <span className="font-bold">Think Creatively</span>}
        </Link>
      </div>

      {/* Collapse Button - Only show on desktop */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-12px] top-6 h-6 w-6 rounded-full border bg-background hidden md:flex"
          onClick={toggleCollapsed}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </Button>
      )}

      {/* Navigation */}
      <ScrollArea className="flex-1 px-4">
        <nav className="flex flex-col gap-6" aria-label="Main navigation">
          {dashboardConfig.map((section: NavSection, i) => (
            <div key={i} className="flex flex-col gap-2">
              {!isCollapsed && <h4 className="text-sm font-semibold text-muted-foreground px-2">{section.title}</h4>}
              {section.items.map(renderNavItem)}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      <UserProfileSection currentPlan={planType} isCollapsed={isCollapsed} />
    </div>
  )

  // Mobile sidebar with sheet component
  if (isMobile) {
    return (
      <>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden fixed left-4 top-4 z-40">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            {sidebarContent}
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return sidebarContent
}

