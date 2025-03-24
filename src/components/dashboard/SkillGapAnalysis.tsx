import React from 'react';

export function SkillGapAnalysis({ skills }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Skill Gap Analysis</h2>
      </div>
      <div className="p-6">
        {skills.length === 0 ? (
          <p className="text-gray-500 text-center">No skill gaps identified yet.</p>
        ) : (
          <div className="space-y-6">
            {skills.map((skill) => (
              <div key={skill.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{skill.name}</h3>
                  <span className="text-xs text-gray-500">{skill.level}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{skill.description}</p>
                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                      <div
                        style={{ width: `${skill.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <h4 className="text-xs font-medium text-gray-900">Recommended Actions:</h4>
                  <ul className="mt-1 text-xs text-gray-500 list-disc list-inside">
                    {skill.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 