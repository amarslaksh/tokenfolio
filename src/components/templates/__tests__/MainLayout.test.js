import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from '../MainLayout';

describe('MainLayout', () => {
  it('renders the header and children correctly', () => {
    render(
      <MainLayout>
        <div data-testid="child-content">This is the main content</div>
      </MainLayout>
    );

    // Check if the header text is present
    expect(screen.getByText(/Crypto Tracker/i)).toBeInTheDocument();

    // Check if the child content is rendered
    expect(screen.getByTestId('child-content')).toHaveTextContent('This is the main content');
  });

  it('has the correct header styling', () => {
    render(
      <MainLayout>
        <div data-testid="child-content">This is the main content</div>
      </MainLayout>
    );

    const header = screen.getByText(/Crypto Tracker/i);
    expect(header).toHaveClass('text-3xl font-bold');  
  });
});
