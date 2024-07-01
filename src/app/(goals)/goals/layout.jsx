import React, { Suspense } from 'react';
import { GoalProvider } from '@/app/context/GoalContext';

export default function GoalsLayout({ children }) {
  return (
    <GoalProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {children}
      </Suspense>
    </GoalProvider>
  );
}
