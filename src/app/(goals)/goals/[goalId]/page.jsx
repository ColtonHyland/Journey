import React from 'react';

const Goal = ({ params }) => {

  const goal_id = params.goalId;
  
  return (
    <div>
      <h1>Goal:</h1> 
      {`id: ${params.goalId}`}
    </div>
  );
}

export default Goal;