import React, { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Dropdown from '../atoms/Dropdown';

const SearchBar = ({ value, onChange, onSearch, currency, onCurrencyChange, currencies }) => {
  const [error, setError] = useState('');

  const handleSearchClick = () => {
    if (value.trim().length < 3) {
      setError('Please enter at least 3 characters to search');
    } else {
      setError('');
      onSearch();
    }
  };

  return (
    <div className="search-bar flex items-center space-x-4">
      <Input
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search for cryptocurrencies"
        className="p-2 border border-gray-300 rounded-md"
      />
      <Button
        onClick={handleSearchClick}
        disabled={value.trim().length < 3} // Disable if search term is less than 3 characters
        className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
          value.trim().length < 3 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
        }`}
      >
        Search
      </Button>
      <Dropdown
        options={currencies}
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default SearchBar;
