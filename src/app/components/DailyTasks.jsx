// components/DailyTasks.js

import React from 'react';

const DailyTasks = ({ tasks }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Daily Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id} className="mb-2">
            <input
              type="checkbox"
              className="mr-2"
              // Handle the task completion logic here
            />
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTasks;