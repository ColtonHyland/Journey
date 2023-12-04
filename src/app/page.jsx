'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; // Import useSession from NextAuth
import { useRouter, redirect } from 'next/navigation'; // Import the useRouter hook
import LoadingSpinner from './components/LoadingSpinner';

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoading = status === 'loading';

  useEffect(() => {
    if (!isLoading && session) {
      router.replace('/dashboard');
    }
  }, [isLoading, session, router]);

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
          <Link href={session ? "/dashboard" : "/login"} passHref> {/* Adjusted link based on session */}
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