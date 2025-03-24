import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Dashboard } from './Dashboard';
import { useAuth } from '../../hooks/useAuth';

// Mock the useAuth hook
vi.mock('../../hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

// Mock the useQuery hook
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe('Dashboard', () => {
  const mockUser = {
    id: '1',
    email: 'test@example.com',
  };

  const mockStats = {
    totalAssessments: 5,
    completedAssessments: 3,
    savedIdeas: 2,
  };

  beforeEach(async () => {
    // Setup default mocks
    useAuth.mockReturnValue({
      user: mockUser,
      isLoading: false,
    });

    const { useQuery } = await import('@tanstack/react-query');
    useQuery.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'stats') {
        return {
          data: mockStats,
          isLoading: false,
          error: null,
        };
      }
      return {
        data: null,
        isLoading: false,
        error: null,
      };
    });
  });

  it('renders loading state when auth is loading', () => {
    useAuth.mockReturnValue({
      user: null,
      isLoading: true,
    });

    render(<Dashboard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders dashboard content when user is authenticated', async () => {
    render(<Dashboard />);

    // Check for main sections
    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/quick actions/i)).toBeInTheDocument();
    expect(screen.getByText(/recent activity/i)).toBeInTheDocument();

    // Check for stats
    await waitFor(() => {
      expect(screen.getByText(/5 total assessments/i)).toBeInTheDocument();
      expect(screen.getByText(/3 completed/i)).toBeInTheDocument();
      expect(screen.getByText(/2 saved ideas/i)).toBeInTheDocument();
    });
  });

  it('renders error state when stats query fails', async () => {
    const { useQuery } = await import('@tanstack/react-query');
    useQuery.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'stats') {
        return {
          data: null,
          isLoading: false,
          error: new Error('Failed to fetch stats'),
        };
      }
      return {
        data: null,
        isLoading: false,
        error: null,
      };
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/error loading dashboard/i)).toBeInTheDocument();
    });
  });

  it('renders empty state when no data is available', async () => {
    const { useQuery } = await import('@tanstack/react-query');
    useQuery.mockImplementation(({ queryKey }) => {
      if (queryKey[0] === 'stats') {
        return {
          data: {
            totalAssessments: 0,
            completedAssessments: 0,
            savedIdeas: 0,
          },
          isLoading: false,
          error: null,
        };
      }
      return {
        data: null,
        isLoading: false,
        error: null,
      };
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/no assessments yet/i)).toBeInTheDocument();
      expect(screen.getByText(/no saved ideas/i)).toBeInTheDocument();
    });
  });
}); 