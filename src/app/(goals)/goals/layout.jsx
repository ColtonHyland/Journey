'use client';
import React from 'react';
import { GoalProvider } from '@/app/context/GoalContext';

const GoalsLayout = ({ children }) => {
  return (
    <GoalProvider>
      <div className="layout-container">
        {children}
      </div>
    </GoalProvider>
  );
};

export default GoalsLayout;
