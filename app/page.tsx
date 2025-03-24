import { HomePage } from "@/components/HomePage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Think Creatively - Transform Your Ideas into Reality",
  description:
    "Unleash your potential with AI-powered insights and expert guidance for business and career development.",
  openGraph: {
    title: "Think Creatively - Transform Your Ideas into Reality",
    description:
      "Unleash your potential with AI-powered insights and expert guidance for business and career development.",
    type: "website",
  },
}

export default function Page() {
  return <HomePage />
}

