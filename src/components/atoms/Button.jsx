import React from 'react';

const Button = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-white font-medium rounded-lg focus:outline-none 
      ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300'}`}
  >
    {children}
  </button>
);

export default Button;
