"use client"

import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/hooks/useAuth"
import { APP_NAME } from "@/lib/constants"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function AuthenticatedNavigation() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      })
    } catch (error) {
      console.error("Error logging out:", error)
      toast({
        title: "Logout failed",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <nav className="bg-primary text-primary-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-2ZPW5VYKwbX0LhPf6oiQGPeHEhX3wO.png"
            alt={`${APP_NAME} Logo`}
            width={40}
            height={40}
          />
          <Link href="/dashboard" className="text-lg font-light tracking-tight">
            {APP_NAME}
          </Link>
        </div>
        <ul className="hidden md:flex space-x-4">
          <li>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/ideas" className="hover:underline">
              My Ideas
            </Link>
          </li>
          <li>
            <Link href="/business" className="hover:underline">
              Business Creator
            </Link>
          </li>
          <li>
            <Link href="/career" className="hover:underline">
              Career Development
            </Link>
          </li>
          <li>
            <Link href="/community" className="hover:underline">
              Community
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.user_metadata.avatar_url} />
                <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push("/profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push("/settings")}>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/ideas" className="hover:underline">
                My Ideas
              </Link>
              <Link href="/business" className="hover:underline">
                Business Creator
              </Link>
              <Link href="/career" className="hover:underline">
                Career Development
              </Link>
              <Link href="/community" className="hover:underline">
                Community
              </Link>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
              <Link href="/settings" className="hover:underline">
                Settings
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}

