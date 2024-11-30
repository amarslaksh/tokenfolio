import { fetchCryptos } from '../api';

jest.mock('../api');

test('fetchCryptos resolves with data', async () => {
  fetchCryptos.mockResolvedValue([{ id: 'bitcoin', name: 'Bitcoin' }]);
  
  const data = await fetchCryptos();
  expect(data).toEqual([{ id: 'bitcoin', name: 'Bitcoin' }]);
});

test('fetchCryptos rejects with an error', async () => {
  fetchCryptos.mockRejectedValue(new Error('API Error'));
  
  await expect(fetchCryptos()).rejects.toThrow('API Error');
});
