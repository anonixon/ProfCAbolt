import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { BusinessTimeline } from "./BusinessTimeline"
import { CheckoutButton } from "./CheckoutButton"

export function BusinessCreatorPage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/business-690675_1920.jpg-lW3hy8eKeEmAv70M7Bn5YZ0UhecmQ6.jpeg"
            alt="Business planning with technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-900/70" /> {/* Dark overlay */}
        </div>

        {/* Content */}
        <div className="relative container px-4 py-6 md:py-12 flex justify-center items-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Turn Your Skills Into a Profitable Business with AI-Powered Guidance!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Unlock your full potential with our AI-driven business development platform. Personalized insights,
              structured frameworks, and expert guidance – all in one place.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
              <Link href="/signup">Start Your Business Journey Now!</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Problem Statement Section */}
      <section className="bg-gray-100 py-16 min-h-screen flex items-center">
        <div className="container mx-auto px-4 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
            Struggling to Find the Right Business Idea?
          </h2>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div>
              <ul className="space-y-4">
                {[
                  "Not sure where to start?",
                  "Too many ideas but no direction?",
                  "Lacking structured guidance?",
                  "Fear of failure holding you back?",
                ].map((point, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-red-500 mr-2 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-lg text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xl text-gray-700 mb-6">
                You're not alone. Many aspiring entrepreneurs face the same struggles. That's why we created Idea
                Creator – to give you a clear, structured path from idea to execution.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
                >
                  <Link href="#pricing">Start Your Journey Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Pricing & Value Proposition Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Affordable, Transparent Pricing for Every Entrepreneur
          </h2>
          <p className="text-xl text-center mb-12 text-gray-600 max-w-3xl mx-auto">
            Choose the plan that best fits your needs and start your journey to business success today.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic Plan",
                price: "£3.99",
                description: "Perfect for getting started",
                features: [
                  "Data science, ML and AI advisory",
                  "AI-generated career/business ideas (limited to 3 suggestions)",
                  "Basic Personal Appraisal (input skills, interests, experience)",
                  "Gamified idea ranking (swipe & rate system)",
                  "Access to community forum for peer discussions",
                  "Limited AI insights (basic execution steps for ideas)",
                  "Save one selected idea for future reference",
                  "Email notifications for periodic insights",
                ],
              },
              {
                name: "Pro Plan",
                price: "£9.99",
                description: "Ideal for serious entrepreneurs",
                features: [
                  "Data science, ML and AI advisory",
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
              },
              {
                name: "Business Elite",
                price: "£39.99",
                description: "For high-growth potential businesses",
                features: [
                  "Data science, ML and AI advisory",
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
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl border-2
    ${index === 1 ? "border-[#00a2ff] shadow-lg shadow-[#00a2ff]/20" : "border-gray-200"}
    before:absolute before:inset-0 before:bg-[radial-gradient(#808080_0.75px,transparent_0.75px)] before:bg-[length:14px_14px] before:opacity-[0.08]
    after:absolute after:inset-0 after:rounded-lg after:transition-opacity after:duration-300
    ${index === 1 ? "after:bg-gradient-to-r after:from-[#00a2ff]/10 after:via-transparent after:to-[#00a2ff]/10" : ""}`}
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">
                    {plan.price}
                    <span className="text-lg font-normal">/month</span>
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
                  <CheckoutButton
                    planName={plan.name}
                    className={`w-full transition-all duration-300 ${
                      index === 1
                        ? "bg-[#00a2ff] hover:bg-[#0077ff] text-white"
                        : "bg-white hover:bg-gray-100 text-gray-900 border border-gray-200"
                    }`}
                  />
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-4">
              Not sure which plan is right for you? Start with our free trial and upgrade anytime.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
              <Link href="/signup">Start Your Free Trial</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <BusinessTimeline />

      {/* FAQ Section */}
      <section className="py-20 bg-white text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">You Have Questions? We Have Answers!</h2>
          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>Who is this platform for?</AccordionTrigger>
              <AccordionContent>
                Our platform is designed for anyone looking to start a business but needs structure and guidance.
                Whether you're a first-time entrepreneur or someone with a great idea but unsure how to execute it,
                we're here to help you turn your vision into reality.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Do I need prior business experience?</AccordionTrigger>
              <AccordionContent>
                No prior business experience is required. Our AI-powered platform and structured roadmap will guide you
                through every step of the process, from ideation to execution. We provide the tools and knowledge you
                need to succeed, regardless of your background.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How does AI help me find the best business idea?</AccordionTrigger>
              <AccordionContent>
                Our AI analyzes your skills, interests, and current market trends to suggest viable business
                opportunities tailored to you. It considers factors like your strengths, passions, and market demand to
                help you identify ideas with the highest potential for success.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What if I need extra help?</AccordionTrigger>
              <AccordionContent>
                We offer comprehensive support through our mentorship programs and community forums. You can connect
                with experienced entrepreneurs, join group coaching sessions, and access a wealth of resources to help
                you overcome any challenges you might face.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Can I cancel anytime?</AccordionTrigger>
              <AccordionContent>
                Yes, we offer flexible subscriptions. You can cancel your subscription at any time without any long-term
                commitments. We're confident that once you experience the value of our platform, you'll want to stay and
                grow with us.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="text-center mt-10">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
              <Link href="/contact">Still have questions? Contact us!</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated Background Beams */}
        <div className="absolute inset-0 bg-slate-950 overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            {/* Fast Beams */}
            <div className="absolute h-[2px] w-[200px] animate-beam-left bg-gradient-to-r from-transparent via-white to-transparent top-1/4 -left-48" />
            <div className="absolute h-[2px] w-[200px] animate-beam-right bg-gradient-to-r from-transparent via-white to-transparent top-1/3 -right-48" />

            {/* Medium Speed Beams */}
            <div className="absolute h-[2px] w-[300px] animate-beam-left-slow bg-gradient-to-r from-transparent via-white to-transparent top-2/4 -left-48" />
            <div className="absolute h-[2px] w-[300px] animate-beam-right-slow bg-gradient-to-r from-transparent via-white to-transparent bottom-1/3 -right-48" />

            {/* Slow Beams */}
            <div className="absolute h-[2px] w-[250px] animate-beam-left-slower bg-gradient-to-r from-transparent via-white to-transparent bottom-1/4 -left-48" />
            <div className="absolute h-[2px] w-[250px] animate-beam-right-slower bg-gradient-to-r from-transparent via-white to-transparent top-2/3 -right-48" />

            {/* Radial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" />
          </div>
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Start Your Business Journey Today!</h2>
            <p className="text-xl mb-8 text-gray-300">
              The sooner you start, the sooner you succeed. Get AI-driven insights and expert guidance now.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 shadow-md"
            >
              <Link href="/signup">Get Started – It's Free!</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

