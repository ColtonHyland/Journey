'use client';
import React, { useRef, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import TaskItem from './TaskItem';
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);

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

  useEffect(() => {
    console.log('Tasks updated:', tasks);
  }, [tasks]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center">Today's Tasks</h2>
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
