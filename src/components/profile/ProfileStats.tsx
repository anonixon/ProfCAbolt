import React from 'react';

export function ProfileStats({ stats }) {
  if (!stats) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Profile Statistics</h3>
      </div>
      <div className="border-t border-gray-200">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Career Assessment Stats */}
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Career Assessments
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.careerAssessments}
            </dd>
            <p className="mt-1 text-sm text-gray-500">
              Completed assessments
            </p>
          </div>

          {/* Business Ideas Stats */}
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Business Ideas
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.businessIdeas}
            </dd>
            <p className="mt-1 text-sm text-gray-500">
              Generated ideas
            </p>
          </div>

          {/* Skills Progress */}
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Skills Progress
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.skillsProgress}%
            </dd>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${stats.skillsProgress}%` }}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Skills development
            </p>
          </div>

          {/* Activity Level */}
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">
              Activity Level
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">
              {stats.activityLevel}
            </dd>
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-500 mr-2">Last 30 days</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full mr-1 ${
                      index < stats.activityLevel
                        ? 'bg-primary'
                        : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <h4 className="text-sm font-medium text-gray-500">Recent Achievements</h4>
        <div className="mt-4 space-y-4">
          {stats.recentAchievements.map((achievement, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {achievement.title}
                </p>
                <p className="text-sm text-gray-500">
                  {achievement.description}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  {new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 