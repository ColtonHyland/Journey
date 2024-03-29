'use client';
import React, { useState } from 'react';
import Calendar from '@/components/calendar/Calendar'; // Ensure this path is correct
import DayTasksModal from '@/components/calendar/DayTasksModal'; // Adjust the import path as needed

const CalendarPage = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dayTasks, setDayTasks] = useState({ date: '', tasks: [] });
  
  // Dummy tasks data
  const tasks = [
    { id: 't1', date: '2024-03-15', title: 'Task 1' },
    { id: 't2', date: '2024-03-15', title: 'Task 2' },
    // Add more tasks as needed
  ];

  const handleDayClick = (day) => {
    const dayStr = day.toISOString().split('T')[0];
    setIsModalOpen(true);
    // Filter tasks for the clicked day
    const tasksForDay = tasks.filter(task => task.date === dayStr);
    setDayTasks({ date: dayStr, tasks: tasksForDay });
  };

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar currentMonth={currentMonth} events={tasks} onDayClick={handleDayClick} />

      <DayTasksModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        dayTasks={dayTasks}
        onTaskUpdate={() => {}} // Implement as needed
        onTaskDelete={() => {}} // Implement as needed
      />
    </div>
  );
};

export default CalendarPage;