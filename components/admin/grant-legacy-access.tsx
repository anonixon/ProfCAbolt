"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function GrantLegacyAccess() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleGrantAccess = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/grant-legacy-access", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to grant legacy access")
      }

      toast({
        title: "Success",
        description: "Full access has been granted to all existing users.",
      })
    } catch (error) {
      console.error("Error granting legacy access:", error)
      toast({
        title: "Error",
        description: "Failed to grant legacy access. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grant Legacy Access</CardTitle>
        <CardDescription>Give all existing users full access to premium features for free</CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Grant Full Access to Existing Users
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will give all existing users permanent full access to all premium features. This cannot be
                undone. New users will still need to subscribe normally.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleGrantAccess}>Yes, grant full access</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}

