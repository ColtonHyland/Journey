'use client';
import React from 'react';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import Link from 'next/link';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
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
        <Link href="/calendar">Back to calendar</Link>
      </div>
    </TaskProvider>
  );
};

export default DaySchedulePage;