'use client';
import React from 'react';
import Link from 'next/link';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
import DayScheduleNavigation from '@/components/calendar/date/DayScheduleNavigation';
import JournalEntryField from '@/components/calendar/date/JournalEntryField';
import { TaskProvider } from '@/app/context/TaskContext';
import { format, parseISO } from 'date-fns';

const DaySchedulePage = ({ params }) => {
  const { date } = params;
  const formattedDate = format(parseISO(date), 'MMMM do, yyyy');

  return (
    <TaskProvider>
      <div className="flex flex-col" style={{ height: `calc(100vh - var(--appbar-height, 64px))` }}>
        <DayScheduleNavigation date={date} />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
            <h1 className="text-2xl font-bold mb-4">Schedule for {formattedDate}</h1>
            <NewTaskForm />
            <DailyTasks />
          </div>
          <div className="h-full">
            <JournalEntryField date={date} />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default DaySchedulePage;