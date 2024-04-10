'use client';
import React from 'react';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
import DayScheduleNavigation from '@/components/calendar/date/DayScheduleNavigation';
import JournalEntryField from '@/components/calendar/date/JournalEntryField';
import { TaskProvider } from '@/app/context/TaskContext';

const DaySchedulePage = ({ params }) => {
  const { date } = params;

  return (
    <TaskProvider>
      <div className="flex flex-col" style={{ height: `calc(100vh - var(--appbar-height, 64px))` }}>
        <DayScheduleNavigation date={date} />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div>
          <h2 className="text-2xl font-bold text-center">Today's Tasks</h2>
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