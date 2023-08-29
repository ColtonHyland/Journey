import React from 'react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-semibold mb-4">Welcome to Your App</h1>
      <p className="text-gray-600 text-lg mb-8">Start managing your tasks and goals with ease.</p>
      <button className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;