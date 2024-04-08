'use client';
import React, { useState, useEffect } from 'react';
import { CalendarProvider, useCalendar } from '@/app/context/CalendarContext';
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
    try {
      setLocalView(currentView);

    } catch (error){
      // Handle errors
      console.error('Error setting local view:', error);
    }
    console.log('currentView:', currentView);

  }, [currentView, localView]);

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
    <CalendarProvider>
      <CalendarNavigation setCurrentView={setCurrentView} />
      {renderCalendarView()}
    </CalendarProvider>
  );
};

export default CalendarPage;