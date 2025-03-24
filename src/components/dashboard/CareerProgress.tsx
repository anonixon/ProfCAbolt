import React from 'react';
import { Link } from 'react-router-dom';

export function CareerProgress({ progress }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Career Progress</h2>
      </div>
      <div className="p-6">
        {progress.length === 0 ? (
          <p className="text-gray-500 text-center">No career progress yet. Start your assessment!</p>
        ) : (
          <div className="space-y-4">
            {progress.map((item) => (
              <div key={item.id} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                  <span className="text-xs text-gray-500">{item.status}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                      <div
                        style={{ width: `${item.progress}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-2 flex justify-end">
                  <Link
                    to={`/career/${item.id}`}
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