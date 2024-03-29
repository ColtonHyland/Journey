'use client';
import React from 'react';
import { CalendarProvider } from '@/components/calendar/CalendarContext';
import CalendarNavigation from '@/components/calendar/CalendarNavigation';
import CalendarGrid from '@/components/calendar/CalendarGrid';

const CalendarPage = () => {
  return (
    <CalendarProvider>
      <CalendarNavigation />
      <CalendarGrid />
      {/* Further components like DayView, WeekView, YearView can be conditionally rendered based on the current view state */}
    </CalendarProvider>
  );
};

export default CalendarPage;