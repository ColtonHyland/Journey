import React from 'react';
import NewTaskForm from '@/components/goals/NewTaskForm';

const SchedulePage = ({ params }) => {
  const { date } = params;

  return (
    <div>
      <h1>Schedule for {date}</h1>
      <p>This is a placeholder page for schedules on a specific date.</p>
      <NewTaskForm />
    </div>
  );
};

export default SchedulePage;