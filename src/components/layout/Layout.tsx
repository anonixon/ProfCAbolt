import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, children, isActive }) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center px-4 py-2 text-sm font-medium rounded-md',
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      {children}
    </Link>
  );
};

export function Layout({ children }: LayoutProps) {
  const { user } = useAuthContext();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="text-xl font-bold">
            ProfCA
          </Link>
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                {user.email}
              </span>
            </div>
          )}
        </div>
      </header>

      <div className="container flex py-6">
        {/* Sidebar */}
        {user && (
          <aside className="w-64 pr-6">
            <nav className="space-y-1">
              <NavItem
                href="/dashboard"
                isActive={location.pathname === '/dashboard'}
              >
                Dashboard
              </NavItem>
              <NavItem
                href="/profile"
                isActive={location.pathname === '/profile'}
              >
                Profile
              </NavItem>
              <NavItem
                href="/career"
                isActive={location.pathname === '/career'}
              >
                Career
              </NavItem>
              <NavItem
                href="/business"
                isActive={location.pathname === '/business'}
              >
                Business
              </NavItem>
              <NavItem
                href="/settings"
                isActive={location.pathname === '/settings'}
              >
                Settings
              </NavItem>
            </nav>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
} 