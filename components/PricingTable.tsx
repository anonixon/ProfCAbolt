"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const plans = [
  {
    name: "Freemium",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    description: "Perfect for getting started",
    features: [
      "Basic idea submission",
      "Limited AI recommendations",
      "Community feedback (3 per month)",
      "Access to basic resources",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: "$19.99",
    yearlyPrice: "$199.99",
    description: "Ideal for serious entrepreneurs",
    features: [
      "Unlimited idea submissions",
      "Advanced AI recommendations",
      "Unlimited community feedback",
      "Access to premium resources",
      "Priority support",
    ],
  },
  {
    name: "Business",
    monthlyPrice: "$49.99",
    yearlyPrice: "$499.99",
    description: "For teams and organizations",
    features: [
      "All Pro features",
      "Team collaboration tools",
      "Custom AI model training",
      "Dedicated account manager",
      "API access",
    ],
  },
]

export function PricingTable() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div>
      <div className="flex justify-center items-center mb-8">
        <span className={`mr-2 ${isYearly ? "text-gray-500" : "font-bold"}`}>Monthly</span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className={`ml-2 ${isYearly ? "font-bold" : "text-gray-500"}`}>Yearly</span>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">
                {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                <span className="text-sm font-normal">/{isYearly ? "year" : "month"}</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

