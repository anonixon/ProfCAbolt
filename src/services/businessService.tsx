import apiClient from '../lib/api-client';

export const businessService = {
  // Generate business ideas
  generateIdeas: async (preferences) => {
    const response = await apiClient.post('/business/generate', { preferences });
    return response.data;
  },

  // Get business idea details
  getIdeaDetails: async (ideaId) => {
    const response = await apiClient.get(`/business/ideas/${ideaId}`);
    return response.data;
  },

  // Submit business idea feedback
  submitFeedback: async (ideaId, feedback) => {
    const response = await apiClient.post(`/business/ideas/${ideaId}/feedback`, { feedback });
    return response.data;
  },

  // Get business recommendations
  getRecommendations: async () => {
    const response = await apiClient.get('/business/recommendations');
    return response.data;
  },

  // Get market analysis
  getMarketAnalysis: async (ideaId) => {
    const response = await apiClient.get(`/business/ideas/${ideaId}/market-analysis`);
    return response.data;
  },

  // Get business plan template
  getBusinessPlanTemplate: async (ideaId) => {
    const response = await apiClient.get(`/business/ideas/${ideaId}/business-plan`);
    return response.data;
  },

  // Save business idea
  saveIdea: async (ideaData) => {
    const response = await apiClient.post('/business/ideas', ideaData);
    return response.data;
  }
}; 