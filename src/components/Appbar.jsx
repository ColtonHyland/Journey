import React from 'react'
import Link from 'next/link';
import SignInButton from './SignInButton'

const Appbar = () => {
  return (
    <header className='flex justify-between items-center p-4 bg-gradient-to-b from-white to-gray-200 shadow w-full'>
      {/* App Name on the left */}
      <h1 className="text-3xl font-bold text-gray-800">
        <Link href="/">
          JOURNEY
        </Link>
      </h1>

      {/* Navigation Links and SignInButton on the right */}
      <div className="flex items-center gap-8">
        <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">
          Dashboard
        </Link>
        <Link href="/calendar" className="text-gray-600 hover:text-blue-600 font-medium">
          Calendar
        </Link>
        <SignInButton /> {/* This button can be styled or adjusted as needed */}
      </div>
    </header>
  );
}

export default Appbar;