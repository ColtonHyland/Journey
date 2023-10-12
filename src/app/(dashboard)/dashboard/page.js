import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DailyTasks from '../../components/DailyTasks'; // Import your DailyTasks component
import WeeklyGoals from '../../components/WeeklyGoals'; // Import your WeeklyGoals component
import QuarterlyGoals from '../../components/QuarterlyGoals'; // Import your QuarterlyGoals component

const Dashboard = () => {

  const { data: session, status } = useSession();

   // Ensure that you have a valid session and it's not in a loading state
   if (status === 'loading') {
    return <p>Loading user data...</p>;
  }

  if (!session) {
    return <p>Please sign in to access the dashboard.</p>;
  }

  // Pass the user object as a prop to child components
  const user = session.user;

  return (
    
  <div className="grid grid-cols-3 gap-4">
  {
  //     <div className="col-span-1">
  //       <DailyTasks />
  //     </div>
  //     <div className="col-span-1">
  //       <WeeklyGoals />
  //     </div>
  //     <div className="col-span-1">
  //       <QuarterlyGoals />
  //     </div>
    }

      {/* Your other dashboard content */}
      <h1>Dashboard</h1>

      {/* Link to the Calendar Page */}
      <Link href="/calendar">
        <button className="text-lg text-white bg-green-600 hover:bg-green-700 py-2 px-4 rounded">
          Go to Calendar
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;