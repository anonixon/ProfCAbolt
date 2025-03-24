import React from 'react';
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(screen.getByText('Transform Your Career')).toBeInTheDocument();
    expect(screen.getByText('With ProfCA')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        'Discover your perfect career path and unlock business opportunities with our AI-powered platform.'
      )
    ).toBeInTheDocument();
  });

  it('renders the call-to-action buttons', () => {
    render(<HomePage />);
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    render(<HomePage />);
    const getStartedLink = screen.getByText('Get Started').closest('a');
    const learnMoreLink = screen.getByText('Learn More').closest('a');

    expect(getStartedLink).toHaveAttribute('href', '/register');
    expect(learnMoreLink).toHaveAttribute('href', '/about');
  });

  it('applies correct styling classes', () => {
    render(<HomePage />);
    
    // Check main container
    expect(screen.getByRole('main')).toHaveClass('min-h-screen', 'bg-white');
    
    // Check heading
    expect(screen.getByText('Transform Your Career')).toHaveClass(
      'text-4xl',
      'tracking-tight',
      'font-extrabold',
      'text-gray-900'
    );
    
    // Check buttons
    expect(screen.getByText('Get Started')).toHaveClass(
      'bg-primary',
      'text-white',
      'hover:bg-primary/90'
    );
    expect(screen.getByText('Learn More')).toHaveClass(
      'text-primary',
      'bg-white',
      'hover:bg-gray-50'
    );
  });
}); 