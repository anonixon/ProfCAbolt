import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Basic Plan",
    price: "£3.99",
    description: "Perfect for getting started",
    features: [
      "AI-generated career/business ideas (limited to 3 suggestions)",
      "Basic Personal Appraisal (input skills, interests, experience)",
      "Gamified idea ranking (swipe & rate system)",
      "Access to community forum for peer discussions",
      "Limited AI insights (basic execution steps for ideas)",
      "Save one selected idea for future reference",
      "Email notifications for periodic insights",
    ],
    cta: "Get Started",
    ctaLink: "/signup",
  },
  {
    name: "Pro Plan",
    price: "£9.99",
    description: "Ideal for serious entrepreneurs",
    features: [
      "Everything in Basic, PLUS:",
      "AI-generated ideas expanded to 10 suggestions",
      "Advanced AI insights – detailed execution roadmap for selected ideas",
      "Market Validation – AI-powered market research & demand analysis",
      "Ability & Preference Matrix – personalized matching to best-fit ideas",
      "Save & track multiple ideas (up to 5)",
      "Premium access to community discussion + expert Q&A sessions",
      "AI-powered resume builder (for career users)",
      "Lean business model canvas generator (for business users)",
      "Custom action plan – step-by-step execution based on chosen idea",
    ],
    cta: "Upgrade to Pro",
    ctaLink: "/signup?plan=pro",
  },
  {
    name: "Business Elite",
    price: "£39.99",
    description: "For high-growth potential businesses",
    features: [
      "Everything in Pro, PLUS:",
      "Unlimited AI-generated ideas tailored to business/career needs",
      "Deep AI business model analysis & financial projections",
      "Live mentorship & coaching from industry experts (1-on-1 sessions)",
      "Exclusive masterclasses & webinars (growth, funding, career trends)",
      "Funding & investment matchmaking (for business users)",
      "Exclusive hiring & networking opportunities (for career users)",
      "Custom AI chatbot integration for personalized business/career guidance",
      "White-label AI solutions for company teams",
      "Team collaboration tools (for business & startup founders)",
      "API Access for integrating AI-powered insights into existing platforms",
      "Dedicated account manager for business growth",
      "Talent Swap - connect with other professionals for skill exchange",
    ],
    cta: "Contact Sales",
    ctaLink: "/contact",
  },
]

export function PricingPage() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Pricing Plans
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the plan that best fits your needs and start transforming your ideas into reality.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-2
  ${index === 1 ? "border-[#00a2ff] shadow-lg shadow-[#00a2ff]/20" : "border-gray-200"}
  before:absolute before:inset-0 before:bg-[radial-gradient(#808080_0.75px,transparent_0.75px)] before:bg-[length:14px_14px] before:opacity-[0.08]
  after:absolute after:inset-0 after:rounded-lg after:transition-opacity after:duration-300
  ${index === 1 ? "after:bg-gradient-to-r after:from-[#00a2ff]/10 after:via-transparent after:to-[#00a2ff]/10" : ""}`}
            >
              <CardHeader>
                <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold mb-4 text-white">
                  {plan.price}
                  <span className="text-lg font-normal text-white/80">/month</span>
                </p>
                <ul className="space-y-2">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center">
                      <Check className="mr-2 h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  className={`w-full transition-all duration-300 ${
                    index === 1
                      ? "bg-[#00a2ff] hover:bg-[#0077ff] text-white"
                      : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  <Link href={plan.ctaLink}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

