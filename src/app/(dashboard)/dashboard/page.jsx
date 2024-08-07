'use client';
import React from 'react';
import Link from 'next/link';
import DailyTasksContainer from '@/components/tasks/DailyTasksContainer';
import CurrentGoalsContainer from '@/components/goals/CurrentGoalsContainer';
import { TaskProvider } from '@/app/context/TaskContext';
import { GoalProvider } from '@/app/context/GoalContext';

const Dashboard = () => {
  const currentDate = new Date().toLocaleDateString('en-CA'); // Get current local date in YYYY-MM-DD format

  console.log(`Dashboard currentDate: ${currentDate}`);

  return (
    <TaskProvider date={currentDate}>
      <GoalProvider>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <CurrentGoalsContainer />
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            <DailyTasksContainer date={currentDate}/>
          </div>
          <div className="col-span-1 bg-white p-4 rounded shadow">
            {/* Placeholder for the third container */}
            <div className="h-full flex items-center justify-center text-gray-500">Third Container</div>
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <div className="flex space-x-4 mt-4">
            <Link href="/goals">
              <button className="text-lg text-white bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded">
                View All Goals
              </button>
            </Link>
            <Link href="/calendar">
              <button className="text-lg text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded">
                Go to Calendar
              </button>
            </Link>
          </div>
        </div>
      </div>
      </GoalProvider>
    </TaskProvider>

  );
};

export default Dashboard;
