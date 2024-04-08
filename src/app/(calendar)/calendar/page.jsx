'use client';
import React, { useState, useEffect } from 'react';
import { useCalendar } from '@/app/context/CalendarContext';
import CalendarNavigation from '@/components/calendar/CalendarNavigation';
import CalendarGrid from '@/components/calendar/CalendarGrid';
import DayView from '@/components/calendar/views/DayView';
import WeekView from '@/components/calendar/views/WeekView';
import YearView from '@/components/calendar/views/YearView';

const CalendarPage = () => {
  // Use a local state to manage the view as a fallback
  const [localView, setLocalView] = useState('month');
  const { currentView, setCurrentView } = useCalendar();

  // Sync localView with context's currentView
  useEffect(() => {
    console.log('Current view in CalendarPage:', currentView);
  }, []);

  const renderCalendarView = () => {
    switch (currentView) {
      case 'day':
        return <DayView />;
      case 'week':
        return <WeekView />;
      case 'month':
        return <CalendarGrid />;
      case 'year':
        return <YearView />;
      default:
        return <CalendarGrid />;
    }
  };

  return (
    <>
      <CalendarNavigation setCurrentView={setCurrentView} />
      {renderCalendarView()}
    </>
  );
};

export default CalendarPage;