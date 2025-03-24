import React from 'react';

export function IdeaList({ ideas, onSelectIdea, selectedIdeaId }) {
  if (!ideas?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Your Business Ideas</h2>
        <p className="text-gray-500">No business ideas generated yet. Use the generator above to create some ideas!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Your Business Ideas</h2>
      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
              selectedIdeaId === idea.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-primary/50'
            }`}
            onClick={() => onSelectIdea(idea)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{idea.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{idea.industry}</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                {idea.investment}
              </span>
            </div>
            <p className="mt-2 text-gray-600">{idea.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {idea.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>{idea.location}</span>
              <span>Created {new Date(idea.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 