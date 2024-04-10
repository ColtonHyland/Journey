'use client';
import React from 'react';
import Link from 'next/link';
import { format, parseISO, addDays, subDays } from 'date-fns';
import { useCalendar } from '@/app/context/CalendarContext';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
import JournalEntryField from '@/components/calendar/date/JournalEntryField';
import { TaskProvider } from '@/app/context/TaskContext';

const DaySchedulePage = ({ params }) => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const date = params.date || format(new Date(), 'yyyy-MM-dd'); // Fallback to current date if none provided
  const formattedDate = format(parseISO(date), 'MMMM do, yyyy');

  const handlePrevDay = () => {
    const prevDay = format(subDays(parseISO(date), 1), 'yyyy-MM-dd');
    setSelectedDate(prevDay);
  };

  const handleNextDay = () => {
    const nextDay = format(addDays(parseISO(date), 1), 'yyyy-MM-dd');
    setSelectedDate(nextDay);
  };

  return (
    <TaskProvider>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevDay} className="text-xl font-semibold hover:text-blue-500 transition-colors">&#9664;</button>
          <h1 className="text-2xl font-bold text-center">Schedule for {formattedDate}</h1>
          <button onClick={handleNextDay} className="text-xl font-semibold hover:text-blue-500 transition-colors">&#9654;</button>
        </div>
        <div className="text-center mb-6">
          <Link href="/calendar" className="text-blue-600 hover:underline">Calendar</Link> | {''}
          <Link href="/dashboard" className="text-blue-600 hover:underline">Dashboard</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <NewTaskForm />
            <DailyTasks />
          </div>
          <JournalEntryField date={date} />
        </div>
      </div>
    </TaskProvider>
  );
};

export default DaySchedulePage;