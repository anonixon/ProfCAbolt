import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button'

export function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Professional Career Assessment
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Take our comprehensive career assessment to discover your ideal career path and unlock your professional potential.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">Career Assessment</h3>
              <p className="mt-2 text-gray-600">
                Take our scientifically designed assessment to understand your strengths and interests.
              </p>
            </div>
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">Expert Analysis</h3>
              <p className="mt-2 text-gray-600">
                Receive detailed insights and recommendations from career experts.
              </p>
            </div>
            <div className="text-center">
              <h3 className="mt-2 text-lg font-semibold">Career Guidance</h3>
              <p className="mt-2 text-gray-600">
                Get personalized guidance and resources to help you succeed in your chosen path.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-32 rounded-2xl bg-gray-50 px-6 py-12 md:px-12 md:py-20">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Ready to discover your ideal career?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Join thousands of professionals who have found their path with ProfCA.
            </p>
            <div className="mt-8">
              <Link to="/register">
                <Button size="lg">Start Your Assessment</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 