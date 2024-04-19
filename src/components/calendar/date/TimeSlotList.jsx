'use client';
import React, { useRef, useEffect, useState } from 'react';
import TimeSlot from './TimeSlot';
import TaskItem from './TaskItem';
import NewTaskForm from '@/components/tasks/NewTaskForm'; // Ensure this is the correct path
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    const initialScrollPosition = savedScrollPosition ? parseInt(savedScrollPosition, 10) : 0;
    if (containerRef.current) {
      containerRef.current.scrollTop = initialScrollPosition;
    }

    const handleScroll = () => {
      if (containerRef.current) {
        sessionStorage.setItem('scrollPosition', containerRef.current.scrollTop);
      }
    };

    containerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [date]);

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex-grow text-center">
          <h2 className="text-2xl font-bold">Today's Tasks</h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 border border-blue-500 text-blue-500 font-bold text-sm rounded-full hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style={{ whiteSpace: 'nowrap' }}
        >
          <span className="mr-2">+</span>Add Task
        </button>
      </div>
      {showForm && <NewTaskForm setShowForm={setShowForm} date={date} />}
      <div ref={containerRef} className="overflow-auto h-full relative">
        {Array.from({ length: 24 }, (_, i) => (
          <TimeSlot key={i} hour={i} />
        ))}
        {tasks.map(task => (
          <TaskItem key={task.task_id} task={task} />
        ))}
      </div>
    </>
  );
};

export default TimeSlotList;
