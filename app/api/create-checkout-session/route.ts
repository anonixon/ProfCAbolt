import { stripe } from "@/utils/stripe"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { priceId, email } = await req.json()
  const authData = auth()

  if (!priceId) {
    return new NextResponse("Price ID is required", { status: 400 })
  }

  if (!email) {
    return new NextResponse("Email is required", { status: 400 })
  }

  if (!authData.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`, // Changed from /checkout/success
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
    automatic_tax: { enabled: true },
    metadata: {
      userId: authData.user?.id,
    },
  })

  return NextResponse.json({ url: session.url })
}

