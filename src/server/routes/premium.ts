import { Router } from 'express'
import Stripe from 'stripe'
import { authMiddleware } from '../middleware/auth'
import { db } from '../db'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

// Get available premium plans
router.get('/plans', async (req, res) => {
  try {
    const plans = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    })

    const formattedPlans = plans.data.map((product) => ({
      id: product.id,
      name: product.name,
      price: (product.default_price as Stripe.Price).unit_amount! / 100,
      features: product.features,
    }))

    res.json(formattedPlans)
  } catch (error) {
    console.error('Error fetching plans:', error)
    res.status(500).json({ error: 'Failed to fetch plans' })
  }
})

// Create a subscription
router.post('/subscribe', authMiddleware, async (req, res) => {
  try {
    const { planId } = req.body
    const userId = req.user.id

    // Get the user's email from the database
    const { data: user } = await db
      .from('users')
      .select('email')
      .eq('id', userId)
      .single()

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: planId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/dashboard?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/premium?canceled=true`,
      customer_email: user.email,
      metadata: {
        userId,
      },
    })

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error('Error creating subscription:', error)
    res.status(500).json({ error: 'Failed to create subscription' })
  }
})

// Webhook to handle Stripe events
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature']
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return res.status(400).send(`Webhook Error: ${err.message}`)
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId

        if (userId) {
          // Update user's subscription status in the database
          await db
            .from('users')
            .update({
              subscription_status: 'active',
              subscription_id: session.subscription as string,
            })
            .eq('id', userId)
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const userId = subscription.metadata?.userId

        if (userId) {
          // Update user's subscription status in the database
          await db
            .from('users')
            .update({
              subscription_status: 'inactive',
            })
            .eq('id', userId)
        }
        break
      }
    }

    res.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    res.status(500).json({ error: 'Failed to process webhook' })
  }
})

export default router 