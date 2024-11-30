import React from 'react';

const MainLayout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col">
    {/* Header Section */}
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <h1 className="text-3xl font-bold">Crypto Tracker</h1>
    </header>

    {/* Main Content Section */}
    <main className="flex-1 p-6">
      {children}
    </main>
  </div>
);

export default MainLayout;
