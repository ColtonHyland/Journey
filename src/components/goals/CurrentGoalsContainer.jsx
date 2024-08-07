'use client';
import React, { useEffect } from 'react';
import { useGoals } from '@/app/context/GoalContext';
import CurrentGoalItem from './CurrentGoalItem';

const CurrentGoalsContainer = () => {
  const { goals, loading, error } = useGoals();

  // useEffect(() => {
  //   console.log("Goals in CurrentGoalsContainer:", goals);
  // }, [goals]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Today's Goals</h2>
      <ul>
        {goals.filter(goal => goal.status == 'active').map((goal) => (
          <CurrentGoalItem key={goal.goal_id} goal={goal} />
        ))}
      </ul>
    </div>
  );
};

export default CurrentGoalsContainer;
