"use client"

import { memo, useState } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Laptop, Moon, Sun, ChevronUp, Crown, LogOut, Trash2 } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import type { PlanType } from "@/types/subscription"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useRouter } from "next/navigation"
import { PlanUpgradeDialog } from "./PlanUpgradeDialog"
import { DeleteAccountDialog } from "./DeleteAccountDialog"

const plans = [
  {
    name: "Basic Plan",
    price: "£3.99",
    type: "basic" as const,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID!,
  },
  {
    name: "Pro Plan",
    price: "£9.99",
    type: "pro" as const,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID!,
  },
  {
    name: "Business Elite",
    price: "£39.99",
    type: "business" as const,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID!,
  },
]

interface UserProfileSectionProps {
  currentPlan: PlanType
  isCollapsed: boolean
}

export const UserProfileSection = memo(function UserProfileSection({
  currentPlan,
  isCollapsed,
}: UserProfileSectionProps) {
  const { theme, setTheme } = useTheme()
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [upgradeDialogOpen, setUpgradeDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedUpgradePlan, setSelectedUpgradePlan] = useState<(typeof plans)[0] | null>(null)

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const getPlanLabel = () => {
    switch (currentPlan) {
      case "basic":
        return "Basic"
      case "pro":
        return "Pro"
      case "business":
        return "Business Elite"
      default:
        return "Free"
    }
  }

  const content = (
    <Button
      variant="ghost"
      className={cn("w-full justify-start gap-2 px-2 hover:bg-accent", isCollapsed && "justify-center px-2")}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={user?.user_metadata?.avatar_url} />
        <AvatarFallback>{user?.email?.[0].toUpperCase()}</AvatarFallback>
      </Avatar>
      {!isCollapsed && (
        <div className="flex flex-col items-start text-sm">
          <span className="font-medium truncate max-w-[120px]">{user?.email}</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Crown className="h-3 w-3 text-yellow-500" />
            {getPlanLabel()}
          </span>
        </div>
      )}
      {!isCollapsed && <ChevronUp className="ml-auto h-4 w-4 opacity-50" />}
    </Button>
  )

  const handleUpgradeClick = (plan: (typeof plans)[0]) => {
    setSelectedUpgradePlan(plan)
    setUpgradeDialogOpen(true)
  }

  return (
    <div className="mt-auto p-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {isCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>{content}</TooltipTrigger>
                <TooltipContent side="right">
                  <p>{user?.email}</p>
                  <p className="text-xs text-muted-foreground">{getPlanLabel()}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            content
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]" align={isCollapsed ? "center" : "end"} alignOffset={11} forceMount>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  <Laptop className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          <DropdownMenuLabel className="text-xs text-muted-foreground">Upgrade Plan</DropdownMenuLabel>
          {plans
            .filter((plan) => plan.type !== currentPlan)
            .map((plan) => (
              <DropdownMenuItem
                key={plan.type}
                onClick={() => handleUpgradeClick(plan)}
                className="flex items-center justify-between"
              >
                <span>{plan.name}</span>
                <span className="text-xs text-muted-foreground">{plan.price}/mo</span>
              </DropdownMenuItem>
            ))}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            className="text-red-500 focus:text-red-500 focus:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {selectedUpgradePlan && (
        <PlanUpgradeDialog
          isOpen={upgradeDialogOpen}
          onClose={() => {
            setUpgradeDialogOpen(false)
            setSelectedUpgradePlan(null)
          }}
          currentPlan={{
            name: getPlanLabel(),
            price: plans.find((p) => p.type === currentPlan)?.price || "£0",
            type: currentPlan,
          }}
          newPlan={selectedUpgradePlan}
          userId={user?.id || ""}
        />
      )}

      {user && (
        <DeleteAccountDialog
          isOpen={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          userId={user.id}
          userEmail={user.email || ""}
        />
      )}
    </div>
  )
})

