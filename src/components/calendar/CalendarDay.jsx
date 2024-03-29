// components/CalendarDay.jsx
import React from 'react';

const CalendarDay = ({ day, events }) => {
  return (
    <div className="calendar-day">
      <div className="day-number">{day.getDate()}</div>
      {events.map(event => (
        <div key={event.id} className="event">{event.title}</div>
      ))}
    </div>
  );
};

export default CalendarDay;