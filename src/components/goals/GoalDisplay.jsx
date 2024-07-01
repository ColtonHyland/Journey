'use client';
import React, { useEffect } from 'react';
import { useGoals } from '@/app/context/GoalContext';

const GoalDisplay = () => {
  const { goals } = useGoals();

  useEffect(() => {
    console.log("Rendering goals: ", goals);
  }, [goals]);

  return (
    <div>
      {goals.map((goal, index) => (
        <div key={goal.goal_id || index} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{goal.title || 'No Title'}</h2>
          <p className="text-gray-500">Due Date: {new Date(goal.due_date).toLocaleDateString()}</p>
          <p>{goal.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GoalDisplay;
