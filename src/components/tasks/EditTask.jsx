"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from 'react-icons/md';
import { useTasks } from "@/app/context/TaskContext";
import TimeSelector from "./TimeSelector";
import { formatInTimeZone } from "date-fns-tz";
import { Tooltip } from "react-tooltip";

const EditTask = ({ task, date, closeEdit }) => {
  const { editTask, timeConflict } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState(task.start_time);
  const [endTime, setEndTime] = useState(task.end_time);
  const [error, setError] = useState("");
  const [timeConflictWarning, setTimeConflictWarning] = useState("");

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
      setError("Failed to parse start time");
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

    if (timeConflict(updatedTask, task.task_id)) {
      setTimeConflictWarning("Time conflict with another task");
      return;
    } else {
      setTimeConflictWarning("");
    }

    if (!assignedDate || !startTime || !endTime) {
      setError("Please ensure all date and time fields are filled correctly.");
      return;
    }

    try {
      await editTask(updatedTask);
      closeEdit();
    } catch (error) {
      setError("Failed to edit task: " + error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <div className="text-gray-500 flex justify-between items-center mb-4">
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
              <input
                type="text"
                id="title"
                placeholder="Task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Task details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label htmlFor="assigned-date" className="block text-sm font-medium text-gray-700">
                Assigned Date
              </label>
              <input
                type="date"
                id="assigned-date"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex-1 pr-2">
                <div className="text-gray-600 text-sm">Start</div>
                <TimeSelector id="start-time" onChange={handleStartTimeChange} initialTime={startTime}/>
                {timeConflictWarning && (
                  <div data-tip={timeConflictWarning}>
                    <Tooltip place="bottom" type="error" effect="solid" />
                  </div>
                )}
              </div>
              <div className="flex-1 pl-2">
                <div className="text-gray-600 text-sm">End</div>
                <TimeSelector id="end-time" onChange={(time) => setEndTime(time)} initialTime={endTime}/>
              </div>
            </div>
            <div className="flex justify-start space-x-2">
              {timeConflictWarning && <div className="text-red-500">{timeConflictWarning}</div>}
              {error && <div className="text-red-500">{error}</div>}
              <button type="submit" className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900">
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
