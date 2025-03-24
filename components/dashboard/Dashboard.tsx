import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/button';
import { ProgressCard } from './gamification/progress-card';
import { Sidebar } from './sidebar';
import { UserProfileSection } from './user-profile-section';

export function Dashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
          <Button asChild>
            <a href="/login">Log In</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <ProgressCard
                level={5}
                xp={750}
                nextLevelXp={1000}
                streak={7}
              />
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <UserProfileSection user={user} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 