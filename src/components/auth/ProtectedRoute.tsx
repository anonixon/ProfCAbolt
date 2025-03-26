import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if the user is accessing a protected route that requires subscription
  const requiresSubscription = ['/dashboard', '/appraisal', '/ideas'].includes(location.pathname)
  
  if (requiresSubscription && user.subscription_tier === 'free') {
    return <Navigate to="/pricing" state={{ from: location }} replace />
  }

  return <Outlet />
} 