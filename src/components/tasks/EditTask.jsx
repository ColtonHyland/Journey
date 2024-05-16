"use client";
import React, { useState } from "react";
import { MdClose } from 'react-icons/md';
import Draggable from 'react-draggable';
import { useTasks } from "@/app/context/TaskContext";

const EditTask = ({ task, closeEdit }) => {
  const { editTask, timeConflict } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedDate, setAssignedDate] = useState(task.assigned_date);
  const [startTime, setStartTime] = useState(task.start_time);
  const [endTime, setEndTime] = useState(task.end_time);

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
    <Draggable handle=".handle">
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
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
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
                  className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Draggable>
  );
};

export default EditTask;
