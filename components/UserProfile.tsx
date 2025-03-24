"use client"

import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { useUserData } from "@/hooks/useUserData"
import { handleError } from "@/utils/errorHandler"
import { CountrySelect } from "@/components/CountrySelect"
import type { UserProfile } from "@/types/user"

export function UserProfile() {
  const { user } = useAuth()
  const { profile, loading: profileLoading } = useUserData(user?.id)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserProfile>({
    defaultValues: {
      username: profile?.username || "",
      full_name: profile?.full_name || "",
      email: profile?.email || "",
      age: profile?.age || undefined,
      country: profile?.country || "",
      bio: profile?.bio || "",
    },
  })

  const onSubmit = async (data: UserProfile) => {
    try {
      if (!user) throw new Error("No user found")

      const updates = {
        id: user.id,
        ...data,
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("profiles").upsert(updates)

      if (error) throw error

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      const errorMessage = handleError(error)
      toast({
        title: "Error updating profile",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  if (profileLoading) {
    return <div>Loading profile...</div>
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <Input {...register("username", { required: "Username is required" })} placeholder="Username" />
            {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input {...register("full_name", { required: "Full name is required" })} placeholder="Full Name" />
            {errors.full_name && <p className="text-sm text-red-500">{errors.full_name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              placeholder="Email"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Age</label>
            <Input
              {...register("age", {
                valueAsNumber: true,
                required: "Age is required",
                min: { value: 13, message: "Must be at least 13 years old" },
                max: { value: 120, message: "Invalid age" },
              })}
              type="number"
              placeholder="Age"
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <CountrySelect value={profile?.country || ""} onValueChange={(value) => setValue("country", value)} />
            {errors.country && <p className="text-sm text-red-500">{errors.country.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            <Input {...register("bio")} placeholder="Tell us about yourself" />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

