import React from 'react';
import { render, screen } from '@testing-library/react';
import CryptoList from '../CryptoList';

// Mock CryptoCard component
jest.mock('../../moleclues/CryptoCard', () => ({ crypto, currency }) => (
  <div data-testid="crypto-card">
    {crypto.name} - {crypto.current_price} {currency.toUpperCase()}
  </div>
));

describe('CryptoList Component', () => {
  it('renders the list of CryptoCards when cryptos are provided', () => {
    const cryptos = [
      { id: 'bitcoin', name: 'Bitcoin', current_price: 50000 },
      { id: 'ethereum', name: 'Ethereum', current_price: 3000 },
    ];
    render(<CryptoList cryptos={cryptos} currency="usd" />);

    // Check that CryptoCards are rendered
    const cryptoCards = screen.getAllByTestId('crypto-card');
    expect(cryptoCards).toHaveLength(cryptos.length);

    // Check content of the cards
    expect(screen.getByText(/Bitcoin - 50000 USD/i)).toBeInTheDocument();
    expect(screen.getByText(/Ethereum - 3000 USD/i)).toBeInTheDocument();
  });

  it('renders the no cryptocurrencies message when cryptos is empty', () => {
    render(<CryptoList cryptos={[]} currency="usd" />);

    expect(
      screen.getByText(/no cryptocurrencies found./i)
    ).toBeInTheDocument();
  });

  it('renders the no cryptocurrencies message when cryptos is undefined', () => {
    render(<CryptoList cryptos={undefined} currency="usd" />);

    expect(
      screen.getByText(/no cryptocurrencies found./i)
    ).toBeInTheDocument();
  });
});
