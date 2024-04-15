'use client';
import React, { forwardRef } from 'react';

const TimeSlot = forwardRef(({ hour, tasks }, ref) => {
  const displayHour = `${hour % 12 === 0 ? 12 : hour % 12} ${hour < 12 ? 'AM' : 'PM'}`;

  return (
    <div ref={ref} className="flex items-center my-4">
      {/* Display Hour with the text on the left */}
      <div className="text-left font-bold text-gray-700 w-12">
        {displayHour}
      </div>
      {/* Horizontal divider that starts right after the hour and extends to the end */}
      <div className="flex-grow ml-4 border-t border-gray-300"></div>
    </div>
  );
});

export default TimeSlot;