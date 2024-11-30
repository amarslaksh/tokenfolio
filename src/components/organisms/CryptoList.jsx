import React from 'react';
import CryptoCard from '../moleclues/CryptoCard';

const CryptoList = ({ cryptos, currency }) => (
  <div className="crypto-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {cryptos && cryptos.length > 0 ? (
      cryptos.map((crypto) => (
        <CryptoCard key={crypto.id} crypto={crypto} currency={currency} />
      ))
    ) : (
      <p className="col-span-full text-center text-gray-600">No cryptocurrencies found.</p>
    )}
  </div>
);

export default CryptoList;
