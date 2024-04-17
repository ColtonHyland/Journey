'use client';
import React, { forwardRef, useEffect } from 'react';

const TimeSlot = forwardRef(({ hour, tasks }, ref) => {
  // Format the hour to display on the left of the bottom line (as the next slot's label).
  const nextHour = (hour) % 24;
  const displayHour = `${nextHour % 12 === 0 ? 12 : nextHour % 12} ${nextHour < 12 ? 'AM' : 'PM'}`;

  // Determine if the current slot should display a bottom divider (not for 11 PM to 12 AM).
  const showDivider = (hour !== 24) && (hour !== 0);

  useEffect(() => {
    console.log(`Tasks: ${JSON.stringify(tasks)}`);
  }), [tasks];//outpusts Tasks: [{"task_id":"clv4b322p0003u1sjws6jlgc5","goalId":null,"userId":"clud4tfq10000nf7rtgpie44d","title":"wfeefwef","description":"efwefwef","status":null,"assigned_date":"2024-04-17T00:00:00.000Z","created_at":"2024-04-17T21:09:41.466Z","updated_at":"2024-04-17T21:09:41.466Z"}]

  
  return (
    <div ref={ref} className="flex flex-col justify-between h-20 relative">
      {/* Tasks are positioned absolutely to cover the slot area */}
      {tasks.map(task => (
        <div key={task.task_id} className="absolute top-0 left-0 right-0 bg-blue-100 rounded p-2 text-sm">
          {task.title}
        </div>
      ))}
      {/* Conditionally render the divider and the hour label on the same line if not the last slot */}
      {showDivider && (
        <div className="flex justify-between items-center">
          <div className="text-left font-bold text-gray-700 px-1">
            {displayHour}
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
      )}
    </div>
  );
});

export default TimeSlot;
