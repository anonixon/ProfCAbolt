import React from 'react';
import { Link } from 'react-router-dom';

export function FeaturePreview({ feature, isPremium }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
        {isPremium ? (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Premium
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Free
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
      {!isPremium && (
        <div className="mt-4">
          <Link
            to="/pricing"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            Upgrade to access this feature →
          </Link>
        </div>
      )}
    </div>
  );
} 