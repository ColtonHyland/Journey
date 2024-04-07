import React from 'react';
import Link from 'next/link';
import { useCalendar } from '@/app/context/CalendarContext';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, addDays, format } from 'date-fns';

const CalendarGrid = () => {
  const { selectedDate } = useCalendar();

  const startDay = startOfWeek(startOfMonth(selectedDate));
  const endDay = endOfWeek(endOfMonth(selectedDate));
  const days = eachDayOfInterval({ start: startDay, end: endDay });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


  return (
    <div className="flex flex-col">
      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-1 text-center font-medium">
        {dayNames.map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className={`day ${format(day, 'MMM') !== format(selectedDate, 'MMM') ? 'text-gray-400' : ''}`}>
            <Link href={`/schedule/${format(day, 'yyyy-MM-dd')}`} className="inline-block w-full h-20 text-center leading-20 bg-white hover:bg-gray-100">
              {format(day, 'd')}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;