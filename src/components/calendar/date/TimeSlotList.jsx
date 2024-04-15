import React, { useRef, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem('scrollPosition');
    const initialScrollPosition = savedScrollPosition ? parseInt(savedScrollPosition, 10) : 340;
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
    <div ref={containerRef} className="overflow-auto h-full">
      {Array.from({ length: 24 }, (_, i) => i).filter(hour => hour !== 0).map(hour => (
        <TimeSlot
          key={hour}
          hour={hour}
          tasks={tasks.filter(t => new Date(t.assigned_date).getHours() === hour)}
        />
      ))}
    </div>
  );
};

export default TimeSlotList;