import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function PricingPage() {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Basic',
      price: '$9.99',
      features: [
        'Career Assessment',
        'Basic Business Ideas',
        'Email Support',
        'Monthly Reports',
      ],
      cta: user ? 'Upgrade Plan' : 'Get Started',
      href: user ? '/settings' : '/register',
    },
    {
      name: 'Pro',
      price: '$19.99',
      features: [
        'Everything in Basic',
        'Advanced Business Ideas',
        'Priority Support',
        'Weekly Reports',
        'Market Analysis',
        'Career Coaching',
      ],
      cta: user ? 'Upgrade Plan' : 'Get Started',
      href: user ? '/settings' : '/register',
      popular: true,
    },
    {
      name: 'Business',
      price: '$49.99',
      features: [
        'Everything in Pro',
        'Custom Business Plans',
        '24/7 Support',
        'Daily Reports',
        'Advanced Analytics',
        'Personal Mentor',
        'API Access',
      ],
      cta: user ? 'Upgrade Plan' : 'Get Started',
      href: user ? '/settings' : '/register',
    },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that's right for your career journey
          </p>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.popular ? 'border-primary' : ''
              }`}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900">{plan.name}</h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-base font-medium text-gray-500">/mo</span>
                </p>
                <Link
                  to={plan.href}
                  className={`mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium ${
                    plan.popular
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-white text-primary border-primary hover:bg-gray-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-semibold text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <svg
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 