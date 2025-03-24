import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/Navigation"
import { ThemeProvider } from "@/components/theme-provider"
import { Notifications } from "@/components/Notifications"
import { AuthenticatedNavigation } from "@/components/AuthenticatedNavigation"
import { Footer } from "@/components/Footer"
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { User } from "@/types"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
    generator: 'v0.dev'
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
})

export default function RootLayout({
  children,
  user,
}: {
  children: React.ReactNode
  user?: User
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex flex-col min-h-screen bg-white">
              <header className="bg-background border-b">
                {user ? (
                  <>
                    <AuthenticatedNavigation />
                    <Notifications />
                  </>
                ) : (
                  <Navigation />
                )}
              </header>
              <main className="flex-grow bg-background">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}



import './globals.css'