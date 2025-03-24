import React from 'react';
import { Link } from 'react-router-dom';

export function CareerRecommendations({ recommendations }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Career Recommendations</h2>
      </div>
      <div className="p-6">
        {recommendations.length === 0 ? (
          <p className="text-gray-500 text-center">No recommendations available yet.</p>
        ) : (
          <div className="space-y-6">
            {recommendations.map((career) => (
              <div key={career.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{career.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{career.description}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    {career.matchPercentage}% Match
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Required Skills:</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {career.requiredSkills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Growth Potential:</h4>
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                        <div
                          style={{ width: `${career.growthPotential}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Link
                    to={`/career/${career.id}`}
                    className="text-sm text-primary hover:text-primary/80"
                  >
                    View Career Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 