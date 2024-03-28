import React from 'react';
import Link from 'next/link';
import GoalDisplay from '@/components/goals/GoalDisplay';
import TaskDisplay from '@/components/goals/TaskDisplay';

const GoalPage = ({ params }) => {

  const goal_id = params.goalId;

  return (
    <div>
      <Link href="/goals">
        Back to goals
      </Link>
      <h1>Goal:</h1> 
      {`id: ${params.goalId}`}
      <GoalDisplay goalId={goal_id} />
      <TaskDisplay goalId={goal_id} />
    </div>
  );
}

export default GoalPage;