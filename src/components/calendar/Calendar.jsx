import React, { useState, useEffect } from 'react';
import CalendarDay from './CalendarDay'; // We'll create this next

const Calendar = ({ currentMonth, events }) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Generate the days for the current month
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const tempDays = [];

    while (date.getMonth() === currentMonth.getMonth()) {
      tempDays.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDays(tempDays);
  }, [currentMonth]);

  return (
    <div className="calendar-grid">
      {days.map(day => (
        <CalendarDay key={day.toISOString()} day={day} events={events.filter(event => new Date(event.date).toDateString() === day.toDateString())} />
      ))}
    </div>
  );
};

export default Calendar;