import React from 'react';
import Link from 'next/link';
import DailyTasks from '../../../components/DailyTasks'; // Import your DailyTasks component
import WeeklyGoals from '../../../components/WeeklyGoals'; // Import your WeeklyGoals component
import QuarterlyGoals from '../../../components/QuarterlyGoals'; // Import your QuarterlyGoals component

const Dashboard = () => {

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <DailyTasks />
        </div>
        {/* <div className="col-span-1">
          <WeeklyGoals />
        </div>
        <div className="col-span-1">
          <QuarterlyGoals />
        </div> */}
      </div>

      <div className="mt-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>

        {/* Link to the Calendar Page */}
        <Link href="/calendar">
        <button className="text-lg text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded">
          Go to Calendar
        </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;