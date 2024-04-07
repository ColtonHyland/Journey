import React from 'react';
import { useCalendar } from '../../app/context/CalendarContext';
import { format, addMonths, subMonths } from 'date-fns';

const CalendarNavigation = () => {
  const { selectedDate, setSelectedDate, setCurrentView } = useCalendar();

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => subMonths(prevDate, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => addMonths(prevDate, 1));
  };

  return (
    <div className="calendar-navigation">
      <button onClick={() => setCurrentView('day')}>Day</button>
      <button onClick={() => setCurrentView('week')}>Week</button>
      <button onClick={() => setCurrentView('month')}>Month</button>
      <button onClick={() => setCurrentView('year')}>Year</button>
      <button onClick={handlePrevMonth}>Prev</button>
      <div>{format(selectedDate, 'MMMM yyyy')}</div>
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
};

export default CalendarNavigation;