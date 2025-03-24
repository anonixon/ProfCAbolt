"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsDashboard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Career Analytics</CardTitle>
        <CardDescription>Track your progress and career growth</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">+49% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 this week</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">Next: Tomorrow, 2PM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Skill Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+15%</div>
                  <p className="text-xs text-muted-foreground">Leadership skills</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="skills">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Technical Skills</div>
                  <div className="text-sm text-muted-foreground">78%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[78%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Soft Skills</div>
                  <div className="text-sm text-muted-foreground">65%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[65%] rounded-full bg-primary"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Leadership</div>
                  <div className="text-sm text-muted-foreground">42%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[42%] rounded-full bg-primary"></div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="applications">
            <div className="space-y-4">
              <div className="rounded-lg border p-3">
                <div className="font-medium">Senior Developer at TechCorp</div>
                <div className="text-sm text-muted-foreground">Applied: Jan 15, 2023</div>
                <div className="mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full inline-block">
                  Interview Scheduled
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium">Product Manager at InnovateCo</div>
                <div className="text-sm text-muted-foreground">Applied: Jan 10, 2023</div>
                <div className="mt-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block">
                  Application Accepted
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="font-medium">UX Designer at DesignHub</div>
                <div className="text-sm text-muted-foreground">Applied: Jan 5, 2023</div>
                <div className="mt-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full inline-block">
                  Under Review
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

