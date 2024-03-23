import React from 'react';
import Link from 'next/link';

const Goals = ({ goals }) => {

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Goals</h1>
      <ul>
        {goals.map((goal) => (
          <li key={goal.id} className="mb-4">
            <h2 className="text-xl font-semibold">{goal.title}</h2>
            <p>{goal.description}</p>
            <Link href={`/goals/${goal.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;