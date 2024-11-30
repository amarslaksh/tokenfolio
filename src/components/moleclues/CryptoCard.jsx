import React from 'react';

const CryptoCard = ({ crypto, currency }) => (
  <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
    <h3 className="text-xl font-bold text-gray-800">{crypto.name}</h3>
    <p className="text-sm text-gray-600">Symbol: {crypto.symbol.toUpperCase()}</p>
    <p className="text-sm text-gray-800">
      Current Price:  {crypto.current_price.toLocaleString()}  {currency.toUpperCase()}
    </p>
    <p className="text-sm text-gray-800">
      Market Cap: {crypto.market_cap.toLocaleString()} {currency.toUpperCase()}
    </p>
    <p className="text-sm text-green-600">
      High 24h: {crypto.high_24h?.toLocaleString()} {currency.toUpperCase()}
    </p>
    <p className="text-sm text-red-600">
      Low 24h: {crypto.low_24h?.toLocaleString()} {currency.toUpperCase()}
    </p>
    <p className="text-sm text-gray-800">
      Price Change 24h: {crypto.price_change_24h?.toLocaleString()} {currency.toUpperCase()}
    </p>
    <p className="text-sm text-gray-800">
      Market Cap Change 24h: {crypto.market_cap_change_24h?.toLocaleString()} {currency.toUpperCase()}
    </p>
  </div>
);

export default CryptoCard;
