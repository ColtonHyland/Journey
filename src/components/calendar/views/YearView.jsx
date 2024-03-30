import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { eachMonthOfInterval, startOfYear, endOfYear, format } from 'date-fns';

const YearView = () => {
  const { selectedDate } = useCalendar();
  const months = eachMonthOfInterval({
    start: startOfYear(selectedDate),
    end: endOfYear(selectedDate),
  });

  return (
    <div className="year-view">
      {months.map(month => (
        <div key={month} className="month">
          <h3>{format(month, 'MMMM yyyy')}</h3>
          {/* Optionally render indicators for days with events or tasks */}
        </div>
      ))}
    </div>
  );
};

export default YearView;