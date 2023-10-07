import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="animate-spin rounded-full border-t-4 border-b-4 border-gray-900 h-12 w-12"></div>
    </div>
  );
};

export default LoadingSpinner;