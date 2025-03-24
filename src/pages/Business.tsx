import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { businessService } from '../services/businessService';
import { IdeaGenerator } from '../components/business/IdeaGenerator';
import { IdeaList } from '../components/business/IdeaList';
import { MarketAnalysis } from '../components/business/MarketAnalysis';
import { BusinessPlan } from '../components/business/BusinessPlan';

function Business() {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const queryClient = useQueryClient();

  const { data: ideas, isLoading: ideasLoading } = useQuery({
    queryKey: ['businessIdeas'],
    queryFn: businessService.getRecommendations,
  });

  const { data: marketAnalysis, isLoading: analysisLoading } = useQuery({
    queryKey: ['marketAnalysis', selectedIdea?.id],
    queryFn: () => businessService.getMarketAnalysis(selectedIdea.id),
    enabled: !!selectedIdea,
  });

  const { data: businessPlan, isLoading: planLoading } = useQuery({
    queryKey: ['businessPlan', selectedIdea?.id],
    queryFn: () => businessService.getBusinessPlanTemplate(selectedIdea.id),
    enabled: !!selectedIdea,
  });

  const generateMutation = useMutation({
    mutationFn: businessService.generateIdeas,
    onSuccess: () => {
      queryClient.invalidateQueries(['businessIdeas']);
    },
  });

  const saveMutation = useMutation({
    mutationFn: businessService.saveIdea,
    onSuccess: () => {
      queryClient.invalidateQueries(['businessIdeas']);
    },
  });

  const handleGenerateIdeas = async (preferences) => {
    await generateMutation.mutateAsync(preferences);
  };

  const handleSaveIdea = async (ideaData) => {
    await saveMutation.mutateAsync(ideaData);
  };

  if (ideasLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Business Ideas</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IdeaGenerator
              onGenerate={handleGenerateIdeas}
              isGenerating={generateMutation.isLoading}
            />
            <div className="mt-8">
              <IdeaList
                ideas={ideas}
                selectedIdea={selectedIdea}
                onSelectIdea={setSelectedIdea}
                onSaveIdea={handleSaveIdea}
                isSaving={saveMutation.isLoading}
              />
            </div>
          </div>

          <div className="space-y-8">
            {selectedIdea && (
              <>
                <MarketAnalysis
                  analysis={marketAnalysis}
                  isLoading={analysisLoading}
                />
                <BusinessPlan
                  plan={businessPlan}
                  isLoading={planLoading}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Business; 