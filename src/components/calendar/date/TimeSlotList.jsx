"use client";
import "@/app/globals.css";
import React, { useRef, useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import TaskItem from "./TaskItem";
import NewTaskForm from "@/components/tasks/newtaskform/NewTaskForm";
import { useTasks } from "@/app/context/TaskContext";
import { MdAdd } from "react-icons/md";
import CurrentTimeIndicator from "./CurrentTimeIndicator";

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [initialTimes, setInitialTimes] = useState({ startTime: "", endTime: "" });

  useEffect(() => {
    const updateTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const position = (totalMinutes / (24 * 60)) * (24 * 100); // Adjusted height
      
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const scrollPosition = position - containerHeight / 2;
        containerRef.current.scrollTop = scrollPosition;
      }
    };

    updateTimePosition();

    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    if (savedScrollPosition && containerRef.current) {
      containerRef.current.scrollTop = parseInt(savedScrollPosition, 10);
    }

    const handleScroll = () => {
      if (containerRef.current) {
        sessionStorage.setItem("scrollPosition", containerRef.current.scrollTop);
      }
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [date]);

  const handleTimeSlotClick = (hour) => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const startDate = new Date();
    startDate.setHours(hour, 0, 0, 0);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    setInitialTimes({
      startTime: startDate.toISOString(),
      endTime: endDate.toISOString(),
    });
    setShowForm(true);
  };

  return (
    <>
      <div className="relative flex items-center py-2">
        <h2 className="text-2xl font-bold absolute inset-0 text-center mx-auto w-full">
          Today's Tasks
        </h2>
        <div className="flex-grow"></div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          style={{ whiteSpace: "nowrap", position: 'relative', top: '25%', transform: 'translateY(-50%)' }}
        >
          <span className="mr-1"><MdAdd /></span>Add Task
        </button>
      </div>
      {showForm && <NewTaskForm setShowForm={setShowForm} date={date} initialTimes={initialTimes} />}
      <div
        ref={containerRef}
        className="overflow-auto h-full relative"
        style={{ height: "100%" }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <TimeSlot key={i} hour={i} onTimeSlotClick={handleTimeSlotClick} />
        ))}
        {tasks.map((task, index) => (
          <TaskItem key={task.task_id} date={date} task={task} index={index} />
        ))}
        <CurrentTimeIndicator hourHeight={96} />
      </div>
    </>
  );
};

export default TimeSlotList;
