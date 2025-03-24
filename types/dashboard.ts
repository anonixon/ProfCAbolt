import type React from "react"
export interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  items?: NavItem[]
}

export interface NavSection {
  title: string
  items: NavItem[]
}

