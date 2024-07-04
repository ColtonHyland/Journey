"use client";
import React from "react";

const DailyTaskItem = ({ task }) => {
  const startTime = new Date(task.start_time);
  const endTime = new Date(task.end_time);

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date.toLocaleTimeString([], options).replace(" AM", "").replace(" PM", "");
  };

  const amPm = endTime.getHours() >= 12 ? " PM" : " AM";
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <div className="flex items-center">
      <span className="font-bold">{task.title}</span>
      <span className="mx-2">•</span>
      <span className="text-sm">
        {formattedStartTime} - {formattedEndTime}{amPm}
      </span>
    </div>
  );
};

export default DailyTaskItem;
