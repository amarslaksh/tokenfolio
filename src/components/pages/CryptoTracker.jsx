import React, { useState, useEffect } from 'react';
import SearchBar from '../moleclues/SearchBar';
import CryptoList from '../organisms/CryptoList';
import SearchHistory from '../organisms/SearchHistory';
import { fetchCryptos } from '../../services/api';
import { currencies } from '../../utils/constants';

const CryptoTracker = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allCryptos, setAllCryptos] = useState([]); // Full dataset
  const [cryptos, setCryptos] = useState([]); // Filtered dataset
  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'usd');
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch data whenever currency changes
  useEffect(() => {
    setIsLoading(true);
    fetchCryptos(currency)
      .then((data) => {
        setAllCryptos(data);
        setCryptos(data);
      })
      .finally(() => setIsLoading(false));
    localStorage.setItem('currency', currency); // Persist currency in localStorage
  }, [currency]);

  // Handle search logic
  const handleSearch = (term = searchTerm) => {
    if (!term) return;

    setSearchTerm(term); // Update the search term
    setHistory((prev) => [...new Set([term, ...prev])]); // Prevent duplicates
    const filtered = allCryptos.filter((crypto) =>
      crypto.name.toLowerCase().includes(term.toLowerCase())
    );
    setCryptos(filtered); // Filter from the full dataset
  };

  // Handle selection from search history
  const handleHistorySelect = (term) => {
    handleSearch(term); // Re-trigger the search with the selected term
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Loading Indicator */}
      {isLoading && <div className="text-center text-gray-500">Loading...</div>}

      {/* Search Bar Section */}
      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onSearch={() => handleSearch()}
        currency={currency}
        onCurrencyChange={setCurrency}
        currencies={currencies}
      />

      {/* Search History Section */}
      <div className="my-6 flex flex-wrap">
        <div className="w-full sm:w-1/4 p-4">
          <SearchHistory history={history} onSelect={handleHistorySelect} />
        </div>

        {/* Crypto List Section */}
        <div className="w-full sm:w-3/4 p-4">
          <CryptoList cryptos={cryptos} currency={currency} />
        </div>
      </div>
    </div>
  );
};

export default CryptoTracker;
