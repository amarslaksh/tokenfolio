import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import CryptoTracker from './components/pages/CryptoTracker';
import MainLayout from './components/templates/MainLayout';

const App = () => (
  <ErrorBoundary>
    <MainLayout>
      <CryptoTracker />
    </MainLayout>
  </ErrorBoundary>
);

export default App;
