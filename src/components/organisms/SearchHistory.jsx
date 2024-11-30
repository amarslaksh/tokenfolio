import React from 'react';

const SearchHistory = ({ history, onSelect }) => (
  <div className="search-history bg-white p-4 rounded-lg shadow-md border border-gray-200">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">Search History</h3>
    <ul className="space-y-2">
      {history.map((term, index) => (
        <li
          key={index}
          onClick={() => onSelect(term)}
          className="cursor-pointer hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-300"
        >
          {term}
        </li>
      ))}
    </ul>
  </div>
);

export default SearchHistory;
