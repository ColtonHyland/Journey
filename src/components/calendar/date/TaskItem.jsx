'use client';
import React from 'react';
import { useTasks } from '@/app/context/TaskContext';

const TaskItem = ({ task, hourHeight = 60 }) => {
  const { deleteTask } = useTasks();

  const startHour = new Date(task.assigned_date).getHours();
  const startMinute = new Date(task.assigned_date).getMinutes();
  const durationHours = Math.floor(task.duration / 60); // assuming duration is in minutes
  const durationMinutes = task.duration % 60;

  const top = (startHour * hourHeight) + (startMinute / 60 * hourHeight);
  const height = (durationHours * hourHeight) + (durationMinutes / 60 * hourHeight);

  const handleDelete = () => {
    deleteTask(task.task_id);
  };

  return (
    <div
    className="absolute left-14 right-5 rounded-lg bg-blue-300 text-white text-sm p-1"
    style={{
      top: `${top}px`,
      height: `800px`,
      zIndex: 10
    }}
  >
    <button
      onClick={handleDelete}
      className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none"
      style={{ padding: '4px' }}
      title="Delete Task"
    >
      X
    </button>
    {task.title}
  </div>
  );
};

export default TaskItem;
