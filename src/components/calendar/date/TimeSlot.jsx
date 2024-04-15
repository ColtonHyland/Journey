'use client';
import React, { forwardRef } from 'react';

const TimeSlot = forwardRef(({ hour, tasks }, ref) => {
  const displayHour = `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;

  return (
    <div ref={ref} data-hour={hour} className="flex border-b border-gray-300 py-4 px-2">
      <div className="w-20 text-right font-bold text-gray-700 pr-4">{displayHour}</div>
      <div className="flex-1 space-y-2">
        {tasks.map(task => (
          <div key={task.task_id} className="bg-blue-100 rounded p-2 text-sm">
            {task.title}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TimeSlot;