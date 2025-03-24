import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ThemeToggle } from '../theme-toggle';

export function DashboardHeader({ user }) {
  const { logout } = useAuth();

  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <span className="text-gray-500">Welcome back, {user?.name}</span>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={logout}
            className="px-4 py-2 text-sm text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
} 