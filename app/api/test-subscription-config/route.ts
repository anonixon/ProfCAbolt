import { NextResponse } from "next/server"

export async function GET() {
  const config = {
    basicPriceId: process.env.NEXT_PUBLIC_STRIPE_BASIC_PRICE_ID,
    proPriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
    elitePriceId: process.env.NEXT_PUBLIC_STRIPE_ELITE_PRICE_ID,
  }

  // Check if all required environment variables are set
  const missingVars = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key)

  if (missingVars.length > 0) {
    return NextResponse.json(
      {
        error: `Missing required environment variables: ${missingVars.join(", ")}`,
      },
      { status: 500 },
    )
  }

  return NextResponse.json({
    message: "Subscription configuration is valid",
    config: {
      basicPriceId: "***" + config.basicPriceId?.slice(-4),
      proPriceId: "***" + config.proPriceId?.slice(-4),
      elitePriceId: "***" + config.elitePriceId?.slice(-4),
    },
  })
}

