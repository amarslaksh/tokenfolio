import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renders the input and button', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchBar value="" onChange={() => {}} onSearch={() => {}} />
    );
    expect(getByPlaceholderText(/search for cryptocurrencies/i)).toBeInTheDocument();
    expect(getByText(/search/i)).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    const handleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={handleChange} onSearch={() => {}} />
    );
    fireEvent.change(getByPlaceholderText(/search for cryptocurrencies/i), {
      target: { value: 'BTC' },
    });
    expect(handleChange).toHaveBeenCalledWith('BTC');
  });

  it('calls onSearch when button is clicked with valid input', () => {
    const handleSearch = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <SearchBar value="BTC" onChange={() => {}} onSearch={handleSearch} />
    );
  
    const searchButton = getByText(/search/i);
    const input = getByPlaceholderText(/search for cryptocurrencies/i);
  
    // Ensure button is enabled for valid input
    expect(searchButton).not.toBeDisabled();
  
    // Simulate click on search button
    fireEvent.click(searchButton);
  
    // Expect the onSearch callback to be called
    expect(handleSearch).toHaveBeenCalled();
  });

  it('does not call onSearch when button is clicked with invalid input (less than 3 characters)', () => {
    const handleSearch = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <SearchBar value="AB" onChange={() => {}} onSearch={handleSearch} />
    );
  
    const searchButton = getByText(/search/i);
  
    // Ensure button is disabled for invalid input
    expect(searchButton).toBeDisabled();
  
    // Simulate click on search button
    fireEvent.click(searchButton);
  
    // Expect the onSearch callback to NOT be called
    expect(handleSearch).not.toHaveBeenCalled();
  });
});