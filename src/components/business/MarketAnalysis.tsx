import React from 'react';

export function MarketAnalysis({ analysis }) {
  if (!analysis) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
        <p className="text-gray-500">Select a business idea to view its market analysis.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Market Analysis</h2>
      
      <div className="space-y-6">
        {/* Market Size */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Market Size</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Total Addressable Market</span>
              <span className="text-lg font-semibold text-primary">{analysis.marketSize}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${analysis.marketSizePercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Competition */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Competition Analysis</h3>
          <div className="space-y-3">
            {analysis.competitors.map((competitor) => (
              <div key={competitor.name} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{competitor.name}</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-2">{competitor.marketShare}%</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${competitor.marketShare}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Growth Potential */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Growth Potential</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600 block mb-1">Annual Growth Rate</span>
              <span className="text-lg font-semibold text-primary">{analysis.growthRate}</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <span className="text-sm text-gray-600 block mb-1">Market Maturity</span>
              <span className="text-lg font-semibold text-primary">{analysis.marketMaturity}</span>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Key Insights</h3>
          <ul className="space-y-2">
            {analysis.insights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-gray-600">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Risks and Opportunities */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Key Risks</h3>
            <ul className="space-y-2">
              {analysis.risks.map((risk, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <span className="text-gray-600">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Opportunities</h3>
            <ul className="space-y-2">
              {analysis.opportunities.map((opportunity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span className="text-gray-600">{opportunity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 