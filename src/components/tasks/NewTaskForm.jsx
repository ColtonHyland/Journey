'use client';
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import { useTasks } from '@/app/context/TaskContext';

const NewTaskForm = ({ setShowForm, date }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  // Round time to the nearest quarter hour for default values
  useEffect(() => {
    const now = new Date();
    const roundedMinutes = Math.ceil(now.getMinutes() / 15) * 15;
    now.setMinutes(roundedMinutes % 60);
    now.setHours(now.getHours() + (roundedMinutes >= 60 ? 1 : 0));
    const defaultTime = now.toTimeString().substring(0, 5);
    setStartTime(defaultTime);
    setEndTime(defaultTime);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(`${assignedDate}T${endTime}`) < new Date(`${assignedDate}T${startTime}`)) {
      setError("End time cannot be before start time.");
      return;
    }

    const newTask = {
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime,
      end_time: endTime,
    };
    addTask(newTask);
    setShowForm(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <Draggable handle=".handle">
      <div className="absolute top-1/4 left-1/4 right-1/4 bg-white p-4 border border-gray-300 shadow-lg rounded-md z-50 handle" style={{ cursor: 'move', width: '30%' }}>
        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 absolute right-2 top-2">
          <span className="text-xl">&times;</span>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <input
            type="text"
            id="title"
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
          <textarea
            id="description"
            placeholder="Task details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="3"
            required
          />
          <input
            type="date"
            id="assigned-date"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
          <div className="flex justify-between">
            <div className="flex-1 pr-2">
              <input
                type="time"
                id="start-time"
                step="900"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
            <div className="flex-1 pl-2">
              <input
                type="time"
                id="end-time"
                step="900"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
          >
            Confirm
          </button>
        </form>
      </div>
    </Draggable>
  );
};

export default NewTaskForm;
