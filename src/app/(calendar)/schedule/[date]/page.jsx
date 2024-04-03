'use client';
import React from 'react';
import Link from 'next/link';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
import PrevNextDate from '@/components/calendar/PrevNextDate';
import { TaskProvider } from '@/app/context/TaskContext';

const DaySchedulePage = ({ params }) => {
  const { date } = params;

  return (
    <TaskProvider>
      <div>
        <h1>Schedule for {date}</h1>
        <p>This is a placeholder page for schedules on a specific date.</p>
        <NewTaskForm />
        <br />
        <DailyTasks />
        <PrevNextDate date={date} />
        <Link href="/calendar">Back to calendar</Link>
      </div>
    </TaskProvider>
  );
};

export default DaySchedulePage;