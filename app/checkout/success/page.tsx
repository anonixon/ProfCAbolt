import { redirect } from "next/navigation"
import Stripe from "stripe"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id: string }
}) {
  if (!searchParams.session_id) {
    redirect("/pricing")
  }

  // Initialize Stripe with secret key
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
  })

  const session = await stripe.checkout.sessions.retrieve(searchParams.session_id)

  if (!session) {
    redirect("/pricing")
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <CardTitle>Thank you for your subscription!</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Your payment has been processed successfully.</p>
          <p>You will receive a confirmation email shortly with your subscription details.</p>
          <div className="flex justify-center mt-6">
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

