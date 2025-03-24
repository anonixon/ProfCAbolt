import React from 'react';

export function JobMarketTrends({ trends }) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Job Market Trends</h2>
      </div>
      <div className="p-6">
        {trends.length === 0 ? (
          <p className="text-gray-500 text-center">No market trends available.</p>
        ) : (
          <div className="space-y-6">
            {trends.map((trend) => (
              <div key={trend.id} className="border-b last:border-0 pb-6 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{trend.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{trend.description}</p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      trend.trend === 'up'
                        ? 'bg-green-100 text-green-800'
                        : trend.trend === 'down'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {trend.trend === 'up' ? 'Growing' : trend.trend === 'down' ? 'Declining' : 'Stable'}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Market Demand:</h4>
                  <div className="mt-2">
                    <div className="relative pt-1">
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
                        <div
                          style={{ width: `${trend.demand}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Key Insights:</h4>
                  <ul className="mt-2 space-y-2">
                    {trend.insights.map((insight, index) => (
                      <li key={index} className="text-sm text-gray-500">
                        • {insight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900">Salary Range:</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    ${trend.salaryRange.min.toLocaleString()} - ${trend.salaryRange.max.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 