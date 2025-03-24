"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CareerPathVisualizer() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Career Path Visualization</CardTitle>
        <CardDescription>Explore potential career trajectories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Career path visualization */}
          <div className="flex flex-col items-center">
            <div className="mb-8 text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="font-medium">Current Position</h3>
              <p className="text-sm text-muted-foreground">Junior Developer</p>
            </div>

            <div className="h-16 w-0.5 bg-border"></div>

            <div className="mb-8 text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-code"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              </div>
              <h3 className="font-medium">Mid-Term Goal</h3>
              <p className="text-sm text-muted-foreground">Senior Developer</p>
            </div>

            <div className="h-16 w-0.5 bg-border"></div>

            <div className="text-center">
              <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-briefcase"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h3 className="font-medium">Long-Term Goal</h3>
              <p className="text-sm text-muted-foreground">Engineering Manager</p>
            </div>
          </div>

          {/* Skills needed indicators */}
          <div className="absolute left-0 top-20 rounded-lg border bg-background p-2 shadow-sm">
            <p className="text-xs font-medium">Required: Advanced React</p>
          </div>

          <div className="absolute right-0 top-48 rounded-lg border bg-background p-2 shadow-sm">
            <p className="text-xs font-medium">Required: Team Leadership</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

