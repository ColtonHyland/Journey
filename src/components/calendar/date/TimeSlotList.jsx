'use client';
import React, { useContext, useMemo } from 'react';
import TimeSlot from './TimeSlot';
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();

  // Organize tasks by hour
  const tasksByHour = useMemo(() => {
    const hours = Array.from({ length: 24 }, () => []);
    tasks.forEach(task => {
      const hour = new Date(task.assigned_date).getHours();
      hours[hour].push(task);
    });
    return hours;
  }, [tasks]);

  return (
    <div className="overflow-auto h-full" style={{ maxHeight: 'calc(100vh - var(--appbar-height, 64px))' }}>
      {tasksByHour.slice(6, 22).map((hourTasks, index) => (
        <TimeSlot key={index + 6} hour={index + 6} tasks={hourTasks} />
      ))}
    </div>
  );
};

export default TimeSlotList;