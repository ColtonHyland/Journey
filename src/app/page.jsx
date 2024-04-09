'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import LoadingSpinner from '../components/LoadingSpinner';

const LandingPage = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  return (
    <div className="bg-gradient-to-b from-blue-200 to-blue-400 h-screen flex flex-col justify-center items-center">
      {isLoading ? (
        <div className="text-4xl font-bold text-white mb-4">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-white mb-4">
            {session ? `Welcome, ${session.user.name}!` : 'Embark on a transformative experience with Journey.'}
          </h1>
          <p className="text-lg text-white text-center mb-6">
            {session
              ? 'You are now logged in. Start managing your goals, tasks, and reflections.'
              : 'Seamlessly manage your goals, tasks, and reflections in one place, empowering you to make the most of each step in your personal and professional journey.'}
          </p>
          <Link href={session ? "/dashboard" : "/login"} passHref>
            <button className="text-lg text-white bg-green-600 hover-bg-green-700 py-2 px-4 rounded">
              {session ? 'Go to Dashboard' : 'Get Started'}
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default LandingPage;