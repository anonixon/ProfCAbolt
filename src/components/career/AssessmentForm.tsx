import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const assessmentSchema = z.object({
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  skills: z.array(z.string()).min(1, 'Select at least one skill'),
  experience: z.string().min(1, 'Please describe your experience'),
  goals: z.string().min(1, 'Please describe your career goals'),
  preferences: z.object({
    workEnvironment: z.string(),
    workSchedule: z.string(),
    location: z.string(),
  }),
});

export function AssessmentForm({ questions, onSubmit, isSubmitting }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(assessmentSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your main interests?
        </label>
        <div className="space-y-2">
          {questions.interests.map((interest) => (
            <label key={interest.id} className="flex items-center">
              <input
                type="checkbox"
                value={interest.id}
                {...register('interests')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{interest.label}</span>
            </label>
          ))}
        </div>
        {errors.interests && (
          <p className="mt-1 text-sm text-red-600">{errors.interests.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your current skills?
        </label>
        <div className="space-y-2">
          {questions.skills.map((skill) => (
            <label key={skill.id} className="flex items-center">
              <input
                type="checkbox"
                value={skill.id}
                {...register('skills')}
                className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{skill.label}</span>
            </label>
          ))}
        </div>
        {errors.skills && (
          <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your work experience
        </label>
        <textarea
          {...register('experience')}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.experience && (
          <p className="mt-1 text-sm text-red-600">{errors.experience.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What are your career goals?
        </label>
        <textarea
          {...register('goals')}
          rows={4}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.goals && (
          <p className="mt-1 text-sm text-red-600">{errors.goals.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred work environment
          </label>
          <select
            {...register('preferences.workEnvironment')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select an option</option>
            <option value="office">Office</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred work schedule
          </label>
          <select
            {...register('preferences.workSchedule')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">Select an option</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred location
          </label>
          <input
            type="text"
            {...register('preferences.location')}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
      </button>
    </form>
  );
} 