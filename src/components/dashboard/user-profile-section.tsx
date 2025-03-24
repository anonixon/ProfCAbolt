import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function UserProfileSection() {
  const { user } = useAuth();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xl font-medium text-gray-600">
              {user?.email?.[0].toUpperCase()}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-900">{user?.email}</h3>
          <p className="text-sm text-gray-500">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <Link
          to="/profile"
          className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          View Profile
        </Link>
        <Link
          to="/settings"
          className="block w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Settings
        </Link>
      </div>
    </div>
  );
} 