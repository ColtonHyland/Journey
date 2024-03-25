import React from 'react';
import GoalForm from '@/components/goals/NewGoalForm';
import GoalDisplay from '@/components/goals/GoalDisplay';
import TaskDisplay from '@/components/goals/TaskDisplay';

const GoalPage = ({ params }) => {

  const goal_id = params.goalId;

  return (
    <div>
      <h1>Goal:</h1> 
      {`id: ${params.goalId}`}
      <GoalDisplay goalId={goal_id} />
      {/* <GoalForm /> */}
      <TaskDisplay goalId={goal_id} />
    </div>
  );
}

export default GoalPage;