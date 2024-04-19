'use client';
import React from 'react';
import { useTasks } from '@/app/context/TaskContext';

const TaskItem = ({ task, hourHeight = 80 }) => {
  const { deleteTask } = useTasks();
  const startTime = new Date(task.start_time);
  const endTime = new Date(task.end_time);
  const startMinutesFromMidnight = startTime.getUTCHours() * 60 + startTime.getUTCMinutes();
  const endMinutesFromMidnight = endTime.getUTCHours() * 60 + endTime.getUTCMinutes();
  const durationMinutes = endMinutesFromMidnight - startMinutesFromMidnight;
  const top = (startMinutesFromMidnight / 60) * hourHeight;
  const height = (durationMinutes / 60) * hourHeight;

  return (
    <div
      className="absolute left-24 right-14 rounded-lg bg-blue-300 text-white text-sm p-1"
      style={{
        top: `${top}px`,
        height: `${height}px`,
        zIndex: 10
      }}
    >
      <button onClick={() => deleteTask(task.task_id)} className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none" style={{ padding: '4px' }}>
        X
      </button>
      {task.title}
    </div>
  );
};

export default TaskItem;
