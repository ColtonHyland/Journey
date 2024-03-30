import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';

const WeekView = () => {
  const { selectedDate } = useCalendar();
  const start = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Customize week start day if needed
  const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="week-view">
      {days.map(day => (
        <div key={day} className="week-day">
          <h3>{format(day, 'eeee, MMM d')}</h3>
          {/* Render tasks or events for the day */}
        </div>
      ))}
    </div>
  );
};

export default WeekView;