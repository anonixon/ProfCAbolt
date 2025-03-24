import { Check } from "lucide-react"

interface PlanFeaturesProps {
  features: string[]
}

export function PlanFeatures({ features }: PlanFeaturesProps) {
  return (
    <ul className="space-y-2 mt-4">
      {features.map((feature, index) => (
        <li key={index} className="flex items-start">
          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  )
}

