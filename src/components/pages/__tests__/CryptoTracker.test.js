import React from 'react';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import CryptoTracker from '../CryptoTracker';
import { fetchCryptos } from '../../../services/api';

// Mock dependencies
jest.mock('../../../services/api', () => ({
  fetchCryptos: jest.fn(),
}));

jest.mock('../../moleclues/SearchBar', () => ({ value, onChange, onSearch, currency, onCurrencyChange }) => {
    const mockCurrencies = ['usd', 'eur', 'gbp']; 
    return (
      <div>
        <input
          data-testid="search-bar"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
        />
        <button data-testid="search-button" onClick={onSearch}>
          Search
        </button>
        <select
          data-testid="currency-select"
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value)}
        >
          {mockCurrencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    );
  });

jest.mock('../../organisms/CryptoList', () => ({ cryptos, currency }) => (
  <div data-testid="crypto-list">
    {cryptos.length > 0
      ? cryptos.map((crypto) => (
          <div key={crypto.id} data-testid="crypto-item">
            {crypto.name} - {crypto.current_price} {currency.toUpperCase()}
          </div>
        ))
      : 'No cryptocurrencies found.'}
  </div>
));

jest.mock('../../organisms/SearchHistory', () => ({ history, onSelect }) => (
  <div data-testid="search-history">
    {history.map((term, index) => (
      <button key={index} onClick={() => onSelect(term)}>
        {term}
      </button>
    ))}
  </div>
));

describe('CryptoTracker Component', () => {
  const mockCryptos = [
    { id: 'bitcoin', name: 'Bitcoin', current_price: 50000 },
    { id: 'ethereum', name: 'Ethereum', current_price: 3000 },
  ];

  beforeEach(() => {
    fetchCryptos.mockResolvedValue(mockCryptos); // Mock API response
  });

  it('renders the loading indicator while fetching data', async () => {
    render(<CryptoTracker />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => expect(fetchCryptos).toHaveBeenCalled());
  });

  it('renders fetched cryptos in the CryptoList', async () => {
    render(<CryptoTracker />);

    await waitFor(() => {
      const cryptoItems = screen.getAllByTestId('crypto-item');
      expect(cryptoItems).toHaveLength(mockCryptos.length);
      expect(screen.getByText(/Bitcoin - 50000 USD/i)).toBeInTheDocument();
      expect(screen.getByText(/Ethereum - 3000 USD/i)).toBeInTheDocument();
    });
  });

  it('filters cryptos when a search term is entered', async () => {
    render(<CryptoTracker />);

    await waitFor(() => expect(fetchCryptos).toHaveBeenCalled());

    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'bit' } });
    fireEvent.click(screen.getByTestId('search-button'));

    await waitFor(() => {
      expect(screen.getAllByTestId('crypto-item')).toHaveLength(1);
      expect(screen.getByText(/Bitcoin - 50000 USD/i)).toBeInTheDocument();
    });
  });

  it('updates currency and fetches data accordingly', async () => {
    render(<CryptoTracker />);

    await waitFor(() => expect(fetchCryptos).toHaveBeenCalled());

    fireEvent.change(screen.getByTestId('currency-select'), { target: { value: 'eur' } });

    await waitFor(() => {
      expect(fetchCryptos).toHaveBeenCalledWith('eur');
    });
  });

  it('renders search history and allows selecting a term', async () => {
    render(<CryptoTracker />);
  
    // Enter a search term and trigger the search
    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'eth' } });
    fireEvent.click(screen.getByTestId('search-button'));
  
    // Wait for the search history to update
    await waitFor(() => {
      const historyContainer = screen.getByTestId('search-history');
      const historyItem = within(historyContainer).getByText(/eth/i);
      expect(historyItem).toBeInTheDocument();
    });
  
    // Click on the search history item
    const historyContainer = screen.getByTestId('search-history');
    const historyItem = within(historyContainer).getByText(/eth/i);
    fireEvent.click(historyItem);
  
  });

  it('displays "No cryptocurrencies found" when no results match', async () => {
    render(<CryptoTracker />);

    await waitFor(() => expect(fetchCryptos).toHaveBeenCalled());

    fireEvent.change(screen.getByTestId('search-bar'), { target: { value: 'invalid' } });
    fireEvent.click(screen.getByTestId('search-button'));

    expect(screen.getByText(/no cryptocurrencies found/i)).toBeInTheDocument();
  });
});
