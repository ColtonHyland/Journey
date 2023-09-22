import React from 'react';
import Link from 'next/link';

const Dashboard = () => {
  return (
    <div>
      {/* Your dashboard content */}
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