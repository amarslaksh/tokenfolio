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

  it('calls onSearch when button is clicked', () => {
    const handleSearch = jest.fn();
    const { getByText, container } = render(
      <SearchBar value="" onChange={() => {}} onSearch={handleSearch} />
    );

    const searchButton = getByText(/Search/i);
    expect(searchButton).toBeInTheDocument();
    
    fireEvent.click(searchButton);
    expect(handleSearch).toHaveBeenCalled();
  });
});
