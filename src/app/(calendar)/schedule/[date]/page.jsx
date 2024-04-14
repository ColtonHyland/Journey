'use client';
import React from 'react';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasksContainer from '@/components/tasks/DailyTasksContainer';
import TimeSlotList from '@/components/calendar/date/TimeSlotList';
import DayScheduleNavigation from '@/components/calendar/date/DayScheduleNavigation';
import JournalEntryField from '@/components/calendar/date/JournalEntryField';
import { TaskProvider } from '@/app/context/TaskContext';

const DaySchedulePage = ({ params }) => {
  const { date } = params;

  return (
    <TaskProvider date={date}>
      <div className="flex flex-col" style={{ height: `calc(100vh - var(--appbar-height, 64px))` }}>
        <DayScheduleNavigation date={date} />
        <div className="flex flex-1 overflow-hidden"> {/* Ensure this is a flex container */}
          <div className="flex flex-col w-full md:w-1/2 p-4 overflow-auto">
            <h2 className="text-2xl font-bold text-center">Today's Tasks</h2>
            <NewTaskForm date={date}/>
            <TimeSlotList date={date}/>
          </div>
          <div className="flex flex-col w-full md:w-1/2 p-4 overflow-auto">
            <JournalEntryField date={date} />
          </div>
        </div>
      </div>
    </TaskProvider>
  );
};

export default DaySchedulePage;