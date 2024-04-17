'use client';
import React from 'react';

const TaskItem = ({ task, hourHeight = 60 }) => {
  const startHour = new Date(task.assigned_date).getHours();
  const startMinute = new Date(task.assigned_date).getMinutes();
  const durationHours = Math.floor(task.duration / 60); // assuming duration is in minutes
  const durationMinutes = task.duration % 60;

  const top = (startHour * hourHeight) + (startMinute / 60 * hourHeight);
  const height = (durationHours * hourHeight) + (durationMinutes / 60 * hourHeight);

  return (
    <div
      className={`absolute left-14 right-5 rounded-lg bg-blue-300 text-white text-sm p-1`}
      style={{
        top: `${top}px`,
        height: `80px`,
        zIndex: 10 // ensure it's above the slot dividers
      }}
    >
      {task.title}
    </div>
  );
};

export default TaskItem;
