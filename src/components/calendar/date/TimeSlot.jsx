'use client';
import React from 'react';

const TimeSlot = ({ hour, tasks }) => {
  return (
    <div className="flex border-b border-gray-300 py-4 px-2">
      <div className="w-12 text-right font-bold text-gray-700 pr-4">{hour}:00</div>
      <div className="flex-1 space-y-2">
        {tasks.map(task => (
          <div key={task.task_id} className="bg-blue-100 rounded p-2 text-sm">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeSlot