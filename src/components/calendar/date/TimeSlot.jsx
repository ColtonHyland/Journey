'use client';
import React, { forwardRef } from 'react';

const TimeSlot = forwardRef(({ hour, tasks }, ref) => {
  const displayHour = `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;
  const isLastHour = hour === 23;

  return (
    <div ref={ref} className={`flex items-center my-4 relative ${!isLastHour ? 'pb-4' : ''}`} style={{ height: '80px' }}>
      <div className="text-left font-bold text-gray-700">
        {displayHour}
      </div>
      <div className="flex-grow ml-4 border-t border-gray-300"></div>
      {tasks.map(task => (
        <div key={task.task_id} className="absolute top-0 left-0 right-0 bg-blue-100 rounded p-2 text-sm">
          {task.title}
        </div>
      ))}
    </div>
  );
});

export default TimeSlot;