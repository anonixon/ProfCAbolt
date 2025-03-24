import { CheckoutForm } from "@/components/checkout/CheckoutForm"

const PLAN_DETAILS = {
  basic: {
    name: "Basic Plan",
    price: "£3.99",
    features: [
      "AI-generated ideas (3 suggestions)",
      "Basic Personal Appraisal",
      "Community forum access",
      "Basic AI insights",
    ],
  },
  pro: {
    name: "Pro Plan",
    price: "£9.99",
    features: ["10 AI-generated ideas", "Advanced AI insights", "Market validation", "Premium community access"],
  },
  enterprise: {
    name: "Business Elite",
    price: "£39.99",
    features: ["Unlimited AI-generated ideas", "Deep AI analysis", "Live mentorship", "White-label solutions"],
  },
}

export default function CheckoutPage({ params }: { params: { plan: string } }) {
  const planDetails = PLAN_DETAILS[params.plan as keyof typeof PLAN_DETAILS]

  if (!planDetails) {
    return <div>Invalid plan selected</div>
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8">
      <CheckoutForm planName={planDetails.name} price={planDetails.price} features={planDetails.features} />
    </div>
  )
}

