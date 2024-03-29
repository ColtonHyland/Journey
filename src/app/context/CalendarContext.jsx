import React, { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('month'); // Default to month view
  const [selectedDate, setSelectedDate] = useState(new Date());

  const value = {
    currentView,
    setCurrentView,
    selectedDate,
    setSelectedDate,
  };

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => useContext(CalendarContext);