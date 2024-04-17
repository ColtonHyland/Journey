'use client';
import React, { forwardRef,  } from 'react';

const TimeSlot = forwardRef(({ hour }, ref) => {
  const nextHour = (hour) % 24;
  const displayHour = `${nextHour % 12 === 0 ? 12 : nextHour % 12} ${nextHour < 12 ? 'AM' : 'PM'}`;
  const showDivider = (hour !== 24) && (hour !== 0);
  
  return (
    <div ref={ref} className="flex flex-col justify-between h-20 relative">
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
