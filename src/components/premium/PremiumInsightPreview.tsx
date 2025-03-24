import React from 'react';
import { Link } from 'react-router-dom';

export function PremiumInsightPreview({ insight }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{insight.title}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Premium
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-4">{insight.preview}</p>
      <div className="flex items-center justify-between">
        <Link
          to="/pricing"
          className="text-sm font-medium text-primary hover:text-primary/90"
        >
          Upgrade to view full insight →
        </Link>
        <span className="text-sm text-gray-500">{insight.readTime} min read</span>
      </div>
    </div>
  );
} 