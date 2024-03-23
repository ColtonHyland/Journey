import React from 'react';
import GoalForm from '@/components/goals/GoalForm';

const Goal = ({ params }) => {

  const goal_id = params.goalId;

  return (
    <div>
      <h1>Goal:</h1> 
      {`id: ${params.goalId}`}
      <GoalForm />
    </div>
  );
}

export default Goal;