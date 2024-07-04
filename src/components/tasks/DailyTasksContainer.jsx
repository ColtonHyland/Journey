'use client';
import React, { useEffect } from 'react';
import { useTasks } from '@/app/context/TaskContext';
import DailyTaskItem from './DailyTaskItem';

const DailyTasksContainer = () => {
  const { tasks, loading, error, deleteTask } = useTasks();

  useEffect(() => {
    console.log("Tasks in DailyTasksContainer:", tasks);
  }, [tasks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const sortedTasks = [...tasks].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

  return (
    <div className="border border-black p-4">
      <h2 className="text-lg font-bold">Daily Tasks</h2>
      <ul>
      {sortedTasks.length > 0 ? (
          sortedTasks.map((task) => (
            <li key={task.task_id} className="flex justify-between items-center">
              <DailyTaskItem task={task} />
            </li>
          ))
        ) : (
          <li>No tasks for today</li>
        )}
      </ul>
    </div>
  );
};

export default DailyTasksContainer;
