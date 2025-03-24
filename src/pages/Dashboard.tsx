import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { careerService } from '../services/careerService';
import { businessService } from '../services/businessService';
import { useAuth } from '../contexts/AuthContext';
import { DashboardHeader } from '../components/dashboard/DashboardHeader';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { ProgressCard } from '../components/dashboard/ProgressCard';
import { RecentIdeas } from '../components/dashboard/RecentIdeas';
import { CareerProgress } from '../components/dashboard/CareerProgress';
import { SkillGapAnalysis } from '../components/dashboard/SkillGapAnalysis';

function Dashboard() {
  const { user } = useAuth();

  const { data: careerData, isLoading: careerLoading } = useQuery({
    queryKey: ['careerProgress'],
    queryFn: careerService.getRecommendations,
  });

  const { data: businessData, isLoading: businessLoading } = useQuery({
    queryKey: ['recentIdeas'],
    queryFn: businessService.getRecommendations,
  });

  if (careerLoading || businessLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader user={user} />
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProgressCard
              title="Career Assessment Progress"
              progress={careerData?.progress || 0}
              description="Complete your career assessment to get personalized recommendations"
            />
            <ProgressCard
              title="Business Ideas"
              progress={businessData?.progress || 0}
              description="Generate and evaluate business ideas based on your skills"
            />
            <ProgressCard
              title="Skill Development"
              progress={careerData?.skillProgress || 0}
              description="Track your progress in developing recommended skills"
            />
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecentIdeas ideas={businessData?.recentIdeas || []} />
            <CareerProgress progress={careerData?.careerProgress || []} />
          </div>

          <div className="mt-8">
            <SkillGapAnalysis skills={careerData?.skillGap || []} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 