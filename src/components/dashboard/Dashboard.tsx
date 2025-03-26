import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@hooks/useAuth'
import { apiService } from '@services/api'
import { Assessment, AssessmentResult, UserProfile } from '@/types'
import { Button } from '@components/ui/Button'

export function Dashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [results, setResults] = useState<AssessmentResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, assessmentsData] = await Promise.all([
          apiService.getUserProfile(),
          apiService.getAssessments(),
        ])
        setProfile(profileData)
        setAssessments(assessmentsData)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Welcome back, {profile?.full_name || user?.email}</h1>
        <p className="mt-2 text-gray-600">
          You have completed {profile?.assessments_completed || 0} assessments
        </p>
      </div>

      {/* Available Assessments */}
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-semibold">Available Assessments</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <h3 className="font-medium">{assessment.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{assessment.description}</p>
              <div className="mt-4">
                <Link to={`/assessment/${assessment.id}`}>
                  <Button variant="outline" size="sm">
                    Start Assessment
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Features */}
      {profile?.premium_status === 'free' && (
        <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow">
          <h2 className="text-xl font-semibold">Unlock Premium Features</h2>
          <p className="mt-2">
            Get access to advanced assessments, detailed reports, and expert guidance.
          </p>
          <div className="mt-4">
            <Link to="/premium">
              <Button variant="secondary">Upgrade Now</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
} 