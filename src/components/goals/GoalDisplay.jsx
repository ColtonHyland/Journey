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
        <div key={goal.id || index} className="border p-4 mb-4">
          <h2>{goal.title}</h2>
          <p>{goal.description}</p>
        </div>
      ))}
    </div>
  );
}

export default GoalDisplay;
