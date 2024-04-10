"use client";
import React, { useEffect } from 'react';
import { useTasks } from '@/app/context/TaskContext';

const DailyTasksContainer = () => {
  const { tasks, loading, error, deleteTask } = useTasks();

//   if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
  <div>
    <h2 className="text-lg font-bold">Daily Tasks</h2>
    <ul>
      {tasks.map(task => (
        <li key={task.task_id} className="flex justify-between items-center">
          {task.title}
          <button
            onClick={() => deleteTask(task.task_id)}
            className="ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            x
          </button>
        </li>
      ))}
    </ul>
  </div>
);
};

export default DailyTasksContainer;