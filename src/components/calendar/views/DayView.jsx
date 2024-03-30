import React from 'react';
import { useCalendar } from '../context/CalendarContext';
import { format } from 'date-fns';

const DayView = () => {
  const { selectedDate } = useCalendar();
  // Assuming you have a method to fetch tasks for the given day
  // const tasks = fetchTasksForDay(selectedDate);

  return (
    <div className="day-view">
      <h2>{format(selectedDate, 'eeee, MMMM d, yyyy')}</h2>
      {/* Render tasks or events for the day */}
    </div>
  );
};

export default DayView;