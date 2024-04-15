import React, { useRef, useEffect } from 'react';
import TimeSlot from './TimeSlot';
import { useTasks } from '@/app/context/TaskContext';

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);

  useEffect(() => {
    // Set initial scroll position when the component mounts
    if (containerRef.current) {
      const initialScrollPosition = 340;  // Assuming each slot is 50px high, adjust 6 AM
      containerRef.current.scrollTop = initialScrollPosition;
    }
  }, [date]);  // Rerun if the date changes to reset the scroll position

  return (
    <div ref={containerRef} className="overflow-auto h-full">
      {Array.from({ length: 24 }, (_, i) => (
        <TimeSlot
          key={i}
          hour={i}
          tasks={tasks.filter(t => new Date(t.assigned_date).getHours() === i)}
        />
      ))}
    </div>
  );
};

export default TimeSlotList;