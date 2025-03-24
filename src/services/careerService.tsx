import apiClient from '../lib/api-client';

export const careerService = {
  // Get career assessment questions
  getAssessmentQuestions: async () => {
    const response = await apiClient.get('/career/assessment/questions');
    return response.data;
  },

  // Submit career assessment
  submitAssessment: async (answers) => {
    const response = await apiClient.post('/career/assessment/submit', { answers });
    return response.data;
  },

  // Get career recommendations
  getRecommendations: async () => {
    const response = await apiClient.get('/career/recommendations');
    return response.data;
  },

  // Get career details
  getCareerDetails: async (careerId) => {
    const response = await apiClient.get(`/career/${careerId}`);
    return response.data;
  },

  // Get career roadmap
  getCareerRoadmap: async (careerId) => {
    const response = await apiClient.get(`/career/${careerId}/roadmap`);
    return response.data;
  },

  // Get skill recommendations
  getSkillRecommendations: async () => {
    const response = await apiClient.get('/career/skills/recommendations');
    return response.data;
  },

  // Get job market trends
  getJobMarketTrends: async () => {
    const response = await apiClient.get('/career/market-trends');
    return response.data;
  }
}; 