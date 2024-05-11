"use client";
import "@/app/globals.css";
import React, { useRef, useEffect, useState } from "react";
import TimeSlot from "./TimeSlot";
import TaskItem from "./TaskItem";
import NewTaskForm from "@/components/tasks/NewTaskForm";
import { useTasks } from "@/app/context/TaskContext";
import { MdAdd } from "react-icons/md";

const TimeSlotList = ({ date }) => {
  const { tasks } = useTasks();
  const containerRef = useRef(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const savedScrollPosition = sessionStorage.getItem("scrollPosition");
    const initialScrollPosition = savedScrollPosition
      ? parseInt(savedScrollPosition, 10)
      : 0;
    if (containerRef.current) {
      containerRef.current.scrollTop = initialScrollPosition;
    }

    const handleScroll = () => {
      if (containerRef.current) {
        sessionStorage.setItem(
          "scrollPosition",
          containerRef.current.scrollTop
        );
      }
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [date]);

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
      {showForm && <NewTaskForm setShowForm={setShowForm} date={date} />}
      <div
        ref={containerRef}
        className="overflow-auto h-full relative"
        style={{ height: "100%" }}
      >
        {Array.from({ length: 24 }, (_, i) => (
          <TimeSlot key={i} hour={i} />
        ))}
        {tasks.map((task, index) => (
          <TaskItem key={task.task_id} task={task} index={index} />
        ))}
      </div>
    </>
  );
};

export default TimeSlotList;
