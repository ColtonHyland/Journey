import React from 'react';
import { useCalendar } from './CalendarContext';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

const CalendarGrid = () => {
  const { selectedDate } = useCalendar();

  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="calendar-grid">
      {days.map(day => (
        <div key={day} className="day">
          {format(day, 'd')}
          {/* Additional task display logic goes here */}
        </div>
      ))}
    </div>
  );
};

export default CalendarGrid;