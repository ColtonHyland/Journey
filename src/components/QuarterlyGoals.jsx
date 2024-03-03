// components/QuarterlyGoals.js

import React from 'react';

const QuarterlyGoals = ({ goals }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Quarterly Goals</h2>
      <ul>
        {goals.map((goal) => (
          <li key={goal.goal_id} className="mb-2">
            <input
              type="checkbox"
              className="mr-2"
              // Handle the goal completion logic here
            />
            {goal.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuarterlyGoals;