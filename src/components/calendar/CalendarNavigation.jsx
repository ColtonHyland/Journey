import React, { useEffect } from 'react';
import { useCalendar } from '@/app/context/CalendarContext';
import { format, addMonths, subMonths } from 'date-fns';

const CalendarNavigation = () => {
  const { selectedDate, setSelectedDate, setCurrentView, currentView } = useCalendar();

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => addMonths(prevDate, 1));
  };

  const viewOptions = ['day', 'week', 'month', 'year'];

  return (
    <div className="flex items-center justify-between p-4">
      {/* Prev button */}
      <button
        onClick={handlePrevMonth}
        className="text-xl font-semibold hover:text-blue-500 transition-colors"
      >
        &#9664; {/* Left chevron */}
      </button>

      {/* Center section */}
      <div className="flex flex-col items-center">
      <select
          value={currentView}
          onChange={(e) => {
            setCurrentView(e.target.value);
          }}
          className="mb-2 p-1 rounded-lg border border-gray-300"
        >
          {viewOptions.map(option => (
            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
          ))}
        </select>
        {/* Selected date */}
        <div className="text-2xl font-bold">
          {format(selectedDate, 'MMMM yyyy')}
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={handleNextMonth}
        className="text-xl font-semibold hover:text-blue-500 transition-colors"
      >
        &#9654; {/* Right chevron */}
      </button>
    </div>
  );
};

export default CalendarNavigation;