import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { careerService } from '../services/careerService';
import { AssessmentForm } from '../components/career/AssessmentForm';
import { AssessmentProgress } from '../components/career/AssessmentProgress';
import { CareerRecommendations } from '../components/career/CareerRecommendations';
import { JobMarketTrends } from '../components/career/JobMarketTrends';

function Career() {
  const [currentStep, setCurrentStep] = useState(1);
  const queryClient = useQueryClient();

  const { data: questions, isLoading: questionsLoading } = useQuery({
    queryKey: ['assessmentQuestions'],
    queryFn: careerService.getAssessmentQuestions,
  });

  const { data: recommendations, isLoading: recommendationsLoading } = useQuery({
    queryKey: ['careerRecommendations'],
    queryFn: careerService.getRecommendations,
  });

  const { data: marketTrends, isLoading: trendsLoading } = useQuery({
    queryKey: ['jobMarketTrends'],
    queryFn: careerService.getJobMarketTrends,
  });

  const submitMutation = useMutation({
    mutationFn: careerService.submitAssessment,
    onSuccess: () => {
      queryClient.invalidateQueries(['careerRecommendations']);
      setCurrentStep(2);
    },
  });

  const handleSubmitAssessment = async (answers) => {
    await submitMutation.mutateAsync(answers);
  };

  if (questionsLoading || recommendationsLoading || trendsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Career Assessment</h1>
        
        <AssessmentProgress currentStep={currentStep} />

        {currentStep === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Complete Your Assessment</h2>
            <AssessmentForm
              questions={questions}
              onSubmit={handleSubmitAssessment}
              isSubmitting={submitMutation.isLoading}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8">
            <CareerRecommendations recommendations={recommendations} />
            <JobMarketTrends trends={marketTrends} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Career; 