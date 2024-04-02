"use client";
import React, { useEffect } from 'react';
import { useTasks } from '@/app/context/TaskContext';

const DailyTasksContainer = () => {
  const { tasks, loading, error } = useTasks();

  useEffect(() => {
    if (tasks.length > 0) {
      console.log('Tasks:', tasks);
    }
  }, [tasks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-lg font-bold">Daily Tasks</h2>
      <p>Here are your tasks for today:</p>
      <ul>
        {tasks.map((task) => (
          <li key={task.task_id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default DailyTasksContainer;