import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { UserProfile } from "@/components/UserProfile"

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Settings</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <UserProfile />
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="/settings/two-factor">
              <Button>Manage Two-Factor Authentication</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

