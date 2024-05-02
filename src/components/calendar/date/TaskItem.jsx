"use client";
import React, { useState } from "react";
import { useTasks } from "@/app/context/TaskContext";

const TaskItem = ({ task, hourHeight = 80, index }) => {
  const { deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);

  const startTime = new Date(task.start_time);
  const endTime = new Date(task.end_time);
  const startMinutesFromMidnight =
    startTime.getHours() * 60 + startTime.getMinutes();
  const endMinutesFromMidnight = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinutesFromMidnight - startMinutesFromMidnight;
  const top = (startMinutesFromMidnight / 60) * hourHeight;
  const height = (durationMinutes / 60) * hourHeight;

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task.task_id);
    setIsDeleting(false);
  };

  const colors = ["bg-blue-200", "bg-green-200", "bg-red-200"]; // Faint shades for each color
  const backgroundColor = colors[index % colors.length];

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date
      .toLocaleTimeString([], options)
      .replace(" AM", "")
      .replace(" PM", "");
  };

  const amPm = endTime.getHours() >= 12 ? " PM" : " AM";
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <div
      className={`absolute left-24 right-14 rounded-lg ${backgroundColor} text-black text-sm p-1 border border-gray-300`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        zIndex: 10,
      }}
    >
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none"
        style={{ padding: "4px" }}
      >
        {isDeleting ? "Deleting..." : "X"}
      </button>
      <div>
        <span className="font-bold">{task.title}</span>
        <span className="text-xs">
          {" "}
          • {formattedStartTime} - {formattedEndTime}
          {amPm}
        </span>
      </div>{" "}
      {task.description && <p className="text-xs">{task.description}</p>}
    </div>
  );
};

export default TaskItem;
