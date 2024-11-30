import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('InputField', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('updates value on change', () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    const input = getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'New value' } });
    expect(input.value).toBe('New value');
  });
});
