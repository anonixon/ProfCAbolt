import { PremiumInsightPreview } from "@/components/premium/PremiumInsightPreview"
import { CountdownTimer } from "@/components/premium/CountdownTimer"
import { FeaturePreview } from "@/components/premium/FeaturePreview"
import { SpecialOfferBanner } from "@/components/premium/SpecialOfferBanner"

const premiumFeatures = [
  {
    id: "1",
    name: "AI-Powered Career Path Analysis",
    description: "Get detailed insights about your ideal career path based on your skills and interests.",
    previewContent: "Based on your profile, you show strong potential for roles in technology leadership...",
    isPreview: true,
  },
  {
    id: "2",
    name: "Custom Business Plan Generator",
    description: "Generate comprehensive business plans tailored to your industry and goals.",
    previewContent: "Your business idea shows promising market potential in the following areas...",
    isPreview: true,
  },
]

const specialOffer = {
  id: "summer2024",
  title: "Summer Special Offer",
  description: "Get 30% off annual premium membership - Limited time only!",
  discount: 30,
  expiryDate: "2024-06-30T23:59:59",
  features: ["Unlimited AI insights", "Priority support", "Expert consultations"],
}

export default function PremiumPreviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <SpecialOfferBanner offer={specialOffer} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Premium Features Preview</h1>
        <p className="text-muted-foreground">
          Experience the power of our premium features. Upgrade to unlock full access.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {premiumFeatures.map((feature) => (
          <FeaturePreview key={feature.id} feature={feature} />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <PremiumInsightPreview
          title="Market Opportunity Analysis"
          previewContent="Initial analysis shows significant growth potential in emerging markets..."
          fullContent="Comprehensive market analysis with detailed growth projections and competitor insights..."
        />
        <CountdownTimer
          expiryDate={specialOffer.expiryDate}
          title="Limited Time Offer"
          description="Don't miss out on our biggest discount of the year!"
          discount={specialOffer.discount}
        />
      </div>
    </div>
  )
}

