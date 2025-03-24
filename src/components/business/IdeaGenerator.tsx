import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const preferencesSchema = z.object({
  industry: z.string().min(1, 'Please select an industry'),
  investment: z.string().min(1, 'Please select investment range'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  location: z.string().min(1, 'Please enter a location'),
  targetMarket: z.string().min(1, 'Please describe your target market'),
});

export function IdeaGenerator({ onGenerate, isGenerating }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(preferencesSchema),
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Generate Business Ideas</h2>
      <form onSubmit={handleSubmit(onGenerate)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry
          </label>
          <select
            {...register('industry')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select an industry</option>
            <option value="technology">Technology</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="retail">Retail</option>
            <option value="food">Food & Beverage</option>
            <option value="services">Professional Services</option>
          </select>
          {errors.industry && (
            <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Range
          </label>
          <select
            {...register('investment')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select investment range</option>
            <option value="low">$0 - $10,000</option>
            <option value="medium">$10,000 - $50,000</option>
            <option value="high">$50,000+</option>
          </select>
          {errors.investment && (
            <p className="mt-1 text-sm text-red-600">{errors.investment.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Skills
          </label>
          <div className="space-y-2">
            {['Marketing', 'Sales', 'Technology', 'Management', 'Finance'].map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  value={skill}
                  {...register('skills')}
                  className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{skill}</span>
              </label>
            ))}
          </div>
          {errors.skills && (
            <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter city or region"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Market
          </label>
          <textarea
            {...register('targetMarket')}
            rows={3}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Describe your target market..."
          />
          {errors.targetMarket && (
            <p className="mt-1 text-sm text-red-600">{errors.targetMarket.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? 'Generating Ideas...' : 'Generate Ideas'}
        </button>
      </form>
    </div>
  );
} 