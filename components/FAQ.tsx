import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  const faqItems = [
    {
      question: "What is ProfCA?",
      answer:
        "ProfCA is an AI-powered platform that helps individuals and businesses transform their skills, experiences, and passions into viable business ventures or career paths. Through structured AI-driven insights, we guide users from idea generation to execution.",
    },
    {
      question: "Is ProfCA free to use?",
      answer:
        "No, ProfCA is a premium service designed to provide high-value business and career development solutions. We offer three pricing tiers: Basic, Pro, and Enterprise, each with different levels of features and support.",
    },
    {
      question: "Am I locked into a contract?",
      answer:
        "Yes, when you sign up for any of the plans, you are committing to a 6-month contract. This ensures you have enough time to fully develop and implement your business or career strategy.",
    },
    {
      question: "What happens after I select a pricing plan?",
      answer:
        "After selecting your plan, you will:1️⃣ Create an account2️⃣ Verify your email3️⃣ Choose between a business or career pathway4️⃣ Fill out the AI-powered form5️⃣ Receive tailored business or career suggestions6️⃣ Rank your ideas using the gamification system7️⃣ Select your final idea and unlock additional resources",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "If you are on any of the pricing plans, you are committed to a 6-month contract. You may cancel after the contract period ends, but early cancellations are not permitted due to the structured nature of our development process.",
    },
    {
      question: "How does the AI help me choose the right business or career?",
      answer:
        "Our AI analyzes your skills, experiences, interests, and preferences, then compares them to market trends, profitability, and demand to suggest the best business opportunities or career paths for you.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade from Basic to Pro or Enterprise at any time to unlock additional features and deeper AI insights.",
    },
    {
      question: "What makes ProfCA different from other platforms?",
      answer:
        "Unlike generic career or business planning tools, we provide personalized AI-driven recommendations, gamified ranking systems, and structured guidance to help users make data-backed decisions with confidence.",
    },
    {
      question: "How do I get started?",
      answer: "Simply select your plan, sign up, and begin your journey today!",
    },
  ]

  return (
    <section className="py-20 bg-gray-50 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-black">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

