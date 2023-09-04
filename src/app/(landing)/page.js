import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-white mb-4">
        Embark on a transformative experience with Journey.
      </h1>
      <p className="text-lg text-white text-center mb-6">
        Seamlessly manage your goals, tasks, and reflections in one place,
        empowering you to make the most of each step in your personal and professional journey.
      </p>
    </div>
  );
};

export default LandingPage;