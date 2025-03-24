import { BrainCircuit, Target, Users, Settings, HelpCircle, Briefcase, GraduationCap } from "lucide-react"
import type { NavSection } from "@/types/dashboard"

export const dashboardConfig: NavSection[] = [
  {
    title: "Personal Appraisal",
    items: [
      {
        title: "Business Path",
        href: "/business-form",
        icon: Briefcase,
        feature: "personal-appraisal",
      },
      {
        title: "Career Path",
        href: "/career-form",
        icon: GraduationCap,
        feature: "personal-appraisal",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        title: "Idea Matrix",
        href: "/dashboard/idea-matrix",
        icon: BrainCircuit,
        feature: "idea-matrix-basic",
      },
      {
        title: "Ability Matrix",
        href: "/dashboard/ability-matrix",
        icon: Target,
        feature: "ability-matrix",
        upgradeMessage: "Upgrade to Pro or Business to access advanced analysis",
      },
    ],
  },
  {
    title: "Community",
    items: [
      {
        title: "Peer Reviews",
        href: "/dashboard/peer-reviews",
        icon: Users,
        feature: "community-basic",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Help & Resources",
        href: "/help",
        icon: HelpCircle,
      },
    ],
  },
]

