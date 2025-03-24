import React from 'react';
import { Link } from 'react-router-dom';

export function RecentIdeas({ ideas }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Recent Business Ideas</h2>
      </div>
      <div className="p-6">
        {ideas.length === 0 ? (
          <p className="text-gray-500 text-center">No ideas yet. Start generating some!</p>
        ) : (
          <div className="space-y-4">
            {ideas.map((idea) => (
              <div key={idea.id} className="border-b last:border-0 pb-4 last:pb-0">
                <h3 className="text-sm font-medium text-gray-900">{idea.title}</h3>
                <p className="mt-1 text-sm text-gray-500">{idea.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    Created {new Date(idea.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/business/ideas/${idea.id}`}
                    className="text-xs text-primary hover:text-primary/80"
                  >
                    View Details →
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