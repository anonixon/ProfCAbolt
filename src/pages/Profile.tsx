import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileForm } from '../components/profile/ProfileForm';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileActivity } from '../components/profile/ProfileActivity';

export function Profile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile', user.id],
    queryFn: () => userService.getProfile(user.id),
  });

  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['profileStats', user.id],
    queryFn: () => userService.getProfileStats(user.id),
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['profileActivity', user.id],
    queryFn: () => userService.getProfileActivity(user.id),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (data) => userService.updateProfile(user.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile', user.id]);
      setIsEditing(false);
    },
  });

  if (isLoadingProfile || isLoadingStats || isLoadingActivity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Profile Header */}
          <ProfileHeader
            profile={profile}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onCancel={() => setIsEditing(false)}
          />

          {/* Profile Stats */}
          <ProfileStats stats={stats} />

          {/* Profile Form */}
          {isEditing && (
            <ProfileForm
              profile={profile}
              onSubmit={updateProfileMutation.mutate}
              onCancel={() => setIsEditing(false)}
              isSubmitting={updateProfileMutation.isLoading}
            />
          )}

          {/* Profile Activity */}
          <ProfileActivity activity={activity} />
        </div>
      </div>
    </div>
  );
} 