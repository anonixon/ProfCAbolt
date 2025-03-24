import React from 'react';

export function BusinessPlan({ plan }) {
  if (!plan) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Business Plan</h2>
        <p className="text-gray-500">Select a business idea to view its business plan.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Business Plan</h2>
      
      <div className="space-y-6">
        {/* Executive Summary */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Executive Summary</h3>
          <p className="text-gray-600">{plan.executiveSummary}</p>
        </div>

        {/* Business Model */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Business Model</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600 block mb-1">Revenue Streams</span>
                <ul className="space-y-1">
                  {plan.revenueStreams.map((stream, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-700">{stream}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-sm text-gray-600 block mb-1">Cost Structure</span>
                <ul className="space-y-1">
                  {plan.costStructure.map((cost, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-primary mr-2">•</span>
                      <span className="text-gray-700">{cost}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Marketing Strategy */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Marketing Strategy</h3>
          <div className="space-y-4">
            {plan.marketingStrategy.map((strategy, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{strategy.title}</h4>
                <p className="text-gray-600">{strategy.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {strategy.tactics.map((tactic, tacticIndex) => (
                    <span
                      key={tacticIndex}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tactic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Projections */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Financial Projections</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600 block mb-1">Initial Investment</span>
              <span className="text-lg font-semibold text-primary">{plan.initialInvestment}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600 block mb-1">Break-even Point</span>
              <span className="text-lg font-semibold text-primary">{plan.breakEvenPoint}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600 block mb-1">ROI Timeline</span>
              <span className="text-lg font-semibold text-primary">{plan.roiTimeline}</span>
            </div>
          </div>
        </div>

        {/* Implementation Timeline */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Implementation Timeline</h3>
          <div className="space-y-4">
            {plan.timeline.map((phase, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">{phase.title}</h4>
                  <p className="text-sm text-gray-500">{phase.duration}</p>
                  <ul className="mt-2 space-y-1">
                    {phase.tasks.map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-center text-gray-600">
                        <span className="text-primary mr-2">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 