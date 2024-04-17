'use client';
import React from 'react';

const TaskItem = ({ start, duration, title, color = 'bg-blue-200' }) => {
  // Calculate the top offset and height based on the start time and duration
  const hourHeight = 80; // assuming each slot has a height of 80 pixels
  const topPosition = (start % 24) * hourHeight;
  const height = duration * hourHeight;

  return (
    <div
      className={`absolute ${color} rounded p-2 text-sm`}
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
        left: '0',
        right: '0',
      }}
    >
      {title}
    </div>
  );
};

export default TaskItem;
