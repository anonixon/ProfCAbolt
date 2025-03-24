import React from 'react';

export function ProfileHeader({ profile, isEditing, onEdit, onCancel }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                className="h-16 w-16 rounded-full"
                src={profile.avatar || 'https://via.placeholder.com/150'}
                alt={profile.name}
              />
              {isEditing && (
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-sm border border-gray-300 hover:bg-gray-50"
                >
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-sm text-gray-500">{profile.title}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={onEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Location</h3>
            <p className="mt-1 text-sm text-gray-900">{profile.location}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Joined</h3>
            <p className="mt-1 text-sm text-gray-900">
              {new Date(profile.joinedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h3 className="text-sm font-medium text-gray-500">About</h3>
        <p className="mt-1 text-sm text-gray-900">{profile.bio}</p>
      </div>
    </div>
  );
} 