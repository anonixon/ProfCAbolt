export interface PremiumFeature {
  id: string
  name: string
  description: string
  previewContent?: string
  fullContent?: string
  isPreview: boolean
}

export interface SpecialOffer {
  id: string
  title: string
  description: string
  discount: number
  expiryDate: string
  features: string[]
}

