const cache = new Map();

export const fetchCryptos = async (currency) => {
  const cacheKey = `cryptos-${currency}`;
  if (cache.has(cacheKey)) {
    console.log(`Cache hit for ${currency}`);
    return cache.get(cacheKey); // Return cached data
  }

  console.log(`Fetching fresh data for ${currency}`);
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1`
  );
  const data = await response.json();

  cache.set(cacheKey, data); // Store in cache
  return data;
};
