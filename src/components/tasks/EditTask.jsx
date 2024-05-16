"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from 'react-icons/md';
import { useTasks } from "@/app/context/TaskContext";
import TimeSelector from "./TimeSelector";
import { formatInTimeZone } from "date-fns-tz";

const EditTask = ({ task, closeEdit }) => {
  const { editTask, timeConflict } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedDate, setAssignedDate] = useState(task.assigned_date);
  const [startTime, setStartTime] = useState(task.start_time);
  const [endTime, setEndTime] = useState(task.end_time);

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = new Date(task.start_time);
    const end = new Date(task.end_time);

    setStartTime(formatInTimeZone(start, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    setEndTime(formatInTimeZone(end, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  }, [task]);

  const handleStartTimeChange = (isoTime) => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const parsedTime = new Date(isoTime);
      setStartTime(formatInTimeZone(parsedTime, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
      setEndTime(formatInTimeZone(new Date(parsedTime.getTime() + 15 * 60000), timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    } catch (error) {
      console.error("Failed to parse start time", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      task_id: task.task_id,
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime,
      end_time: endTime,
    };

    if (timeConflict(updatedTask)) {
      alert("Time conflict with another task");
      return;
    }

    await editTask(updatedTask);
    closeEdit();
  };

  return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
          <div className="handle cursor-move text-gray-500 flex justify-between items-center mb-4">
            <h2>Edit Task</h2>
            <button
              onClick={closeEdit}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              <MdClose size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  rows="3"
                ></textarea>
              </div>
              <div>
                <label htmlFor="assignedDate" className="block text-sm font-medium text-gray-700">
                  Assigned Date
                </label>
                <input
                  type="date"
                  id="assignedDate"
                  value={assignedDate}
                  onChange={(e) => setAssignedDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex-1 pr-2">
                  <div className="text-gray-600 text-sm">Start</div>
                  <TimeSelector id="start-time" onChange={handleStartTimeChange} />
                </div>
                <div className="flex-1 pl-2">
                  <div className="text-gray-600 text-sm">End</div>
                  <TimeSelector id="end-time" onChange={(time) => setEndTime(time)} />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeEdit}
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default EditTask;
