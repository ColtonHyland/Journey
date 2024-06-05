'use client';
import React, { forwardRef } from 'react';

const TimeSlot = forwardRef(({ hour, onTimeSlotClick }, ref) => {
  const nextHour = (hour) % 24;
  const displayHour = `${nextHour % 12 === 0 ? 12 : nextHour % 12} ${nextHour < 12 ? 'AM' : 'PM'}`;
  const showDivider = (hour !== 24) && (hour !== 0);

  return (
    <div 
      ref={ref} 
      className="flex flex-col justify-between h-20 relative cursor-pointer"
      onClick={() => onTimeSlotClick(hour)}
    >
      <div className="absolute top-0 left-16 bottom-0 w-0.5 bg-gray-300"></div>
      {showDivider && (
        <div className="flex justify-between items-center " style={{ marginTop: '-12px' }}>
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
