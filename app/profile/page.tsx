import { UserProfile } from "@/components/UserProfile"

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">Your Profile</h1>
      <UserProfile />
    </div>
  )
}

