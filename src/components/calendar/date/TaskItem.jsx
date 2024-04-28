'use client';
import React, { useState } from 'react';
import { useTasks } from '@/app/context/TaskContext';

const TaskItem = ({ task, hourHeight = 80 }) => {
  const { deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const startTime = new Date(task.start_time);
  const endTime = new Date(task.end_time);
  const startMinutesFromMidnight = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinutesFromMidnight = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinutesFromMidnight - startMinutesFromMidnight;
  const top = (startMinutesFromMidnight / 60) * hourHeight;
  const height = (durationMinutes / 60) * hourHeight;

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task.task_id);
    setIsDeleting(false);
};

  return (
    <div
      className="absolute left-24 right-14 rounded-lg bg-blue-300 text-white text-sm p-1 border border-dark-blue-3"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        zIndex: 10
      }}
    >
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none"
        style={{ padding: '4px' }}
      >
        {isDeleting ? 'Deleting...' : 'X'}
      </button>
      {task.title}
      {task.description && <p className="text-xs">{task.description}</p>}
    </div>
  );
};

export default TaskItem;
