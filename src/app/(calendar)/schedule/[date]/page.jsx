'use client';
import React from 'react';
import Link from 'next/link';
import NewTaskForm from '@/components/tasks/NewTaskForm';
import DailyTasks from '@/components/tasks/DailyTasksContainer';
import PrevNextDate from '@/components/calendar/PrevNextDate';
import JournalEntryField from '@/components/calendar/date/JournalEntryField';
import { TaskProvider } from '@/app/context/TaskContext';

const DaySchedulePage = ({ params }) => {
  const { date } = params;

//   <TaskProvider>
//   <div>
//     <h1>Schedule for {date}</h1>
//     <p>This is a placeholder page for schedules on a specific date.</p>
//     <NewTaskForm />
//     <br />
//     <DailyTasks />
//     <PrevNextDate date={date} />
//     <Link href="/calendar">Back to calendar</Link>
//   </div>
// </TaskProvider>

  return (
    //tasks on the left column and journal entry on the right column
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <TaskProvider>
        <div>
          <PrevNextDate date={date} />
          <Link href="/calendar">Back to calendar</Link>

          <h1 className="text-2xl font-bold">Schedule for {date}</h1>
          <NewTaskForm />
          <DailyTasks />
        </div>
      </TaskProvider>
      <JournalEntryField date={date} />
    </div>

  );
};

export default DaySchedulePage;