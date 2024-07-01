'use client';
import React, { useEffect } from 'react';
import { useGoals } from '@/app/context/GoalContext';
import GoalItem from './GoalItem';

const GoalDisplay = () => {
  const { goals } = useGoals();

  useEffect(() => {
    console.log("Rendering goals: ", goals);
  }, [goals]);

  return (
    <div>
      {goals.map((goal, index) => (
        <GoalItem key={goal.goal_id || index} goal={goal} />
      ))}
    </div>
  );
}

export default GoalDisplay;
