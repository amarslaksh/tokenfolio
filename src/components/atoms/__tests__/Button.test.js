import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button>Search</Button>);
    expect(getByText('Search')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(<Button onClick={handleClick}>Search</Button>);
    fireEvent.click(getByText('Search'));
    expect(handleClick).toHaveBeenCalled();
  });
});
