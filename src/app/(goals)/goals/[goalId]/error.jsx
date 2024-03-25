'use client';

import React from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  console.error(error); // Log the error to the console for debugging

  return (
    <div className="error-container" style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Goal Not Found</h1>
      <p>The requested goal could not be found or has been deleted.</p>
      <p>
        <Link href="/goals" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Go back to Goals
        </Link>
      </p>
      <button onClick={reset} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Try Again
      </button>
    </div>
  );
}