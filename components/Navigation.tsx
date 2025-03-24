"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { Menu, ShoppingCart } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LogoutButton } from "@/components/LogoutButton"
import { Separator } from "@/components/ui/separator"

export function Navigation() {
  const { user, signOut } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold text-xl">ProfCA</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link to="/business" className="text-gray-600 hover:text-gray-900">
              Business Creator
            </Link>
            <Link to="/career" className="text-gray-600 hover:text-gray-900">
              Career Development
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">
              Contact Us
            </Link>
          </div>
          <div className="hidden md:flex space-x-2">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              {user && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <Button asChild variant="outline">
                      <Link to="/dashboard">My Account</Link>
                    </Button>
                    <LogoutButton />
                  </div>
                  <Separator className="mb-4" />
                </>
              )}
              <div className="flex flex-col space-y-4 mt-4">
                <Link to="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
                <Link to="/pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </Link>
                <Link to="/business" className="text-gray-600 hover:text-gray-900">
                  Business Creator
                </Link>
                <Link to="/career" className="text-gray-600 hover:text-gray-900">
                  Career Development
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact Us
                </Link>
                {!user && (
                  <>
                    <Link to="/login">
                      <Button variant="outline">Login</Button>
                    </Link>
                    <Link to="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

