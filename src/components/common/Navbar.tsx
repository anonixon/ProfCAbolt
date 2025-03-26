import { Link } from 'react-router-dom'
import { Button } from '@components/ui/Button'
import { useAuth } from '@hooks/useAuth'

export function Navbar() {
  const { user, signOut } = useAuth()

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <Link to="/" className="font-bold">
          ProfCA
        </Link>
        <div className="ml-auto flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Button variant="ghost" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
} 