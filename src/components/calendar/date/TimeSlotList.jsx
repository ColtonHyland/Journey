'use client';
import React, { useRef, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const sixAMRef = useRef(null);

  useEffect(() => {
    if (sixAMRef.current) {
      sixAMRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [date]);

  return (
    <div className="overflow-auto h-full">
      {Array.from({ length: 24 }, (_, i) => (
        <TimeSlot
          key={i}
          ref={i === 6 ? sixAMRef : null} // Apply ref only to the 6 AM slot
          hour={i}
          tasks={tasks.filter(t => new Date(t.assigned_date).getHours() === i)}
        />
      ))}
    </div>
  );
};

export default TimeSlotList;