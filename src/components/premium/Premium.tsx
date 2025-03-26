import { useState, useEffect } from 'react'
import { apiService } from '@services/api'
import { PremiumPlan } from '@/types'
import { Button } from '@components/ui/Button'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

export function Premium() {
  const [plans, setPlans] = useState<PremiumPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await apiService.getPremiumPlans()
        setPlans(data)
      } catch (error) {
        console.error('Error fetching premium plans:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  const handleSubscribe = async (planId: string) => {
    try {
      setSubscribing(true)
      const stripe = await stripePromise
      if (!stripe) throw new Error('Stripe failed to load')

      const { data } = await apiService.subscribeToPlan(planId)
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) throw error
    } catch (error) {
      console.error('Error subscribing to plan:', error)
    } finally {
      setSubscribing(false)
    }
  }

  if (loading) {
    return <div>Loading plans...</div>
  }

  return (
    <div className="py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Premium Plans</h1>
        <p className="mt-4 text-gray-600">
          Choose the plan that best fits your needs
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="rounded-lg border bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
          >
            <h2 className="text-2xl font-bold">{plan.name}</h2>
            <p className="mt-4 text-4xl font-bold">
              ${plan.price}
              <span className="text-base font-normal text-gray-600">/month</span>
            </p>
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="ml-3">{feature}</span>
                </li>
              ))}
            </ul>
            <Button
              className="mt-8 w-full"
              onClick={() => handleSubscribe(plan.id)}
              disabled={subscribing}
            >
              {subscribing ? 'Processing...' : 'Subscribe Now'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
} 