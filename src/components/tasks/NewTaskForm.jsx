'use client';
import React, { useState } from 'react';
import { useTasks } from '@/app/context/TaskContext';

const NewTaskForm = ({ setShowForm, date }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      assigned_date: date,
      start_time: startTime,
      end_time: endTime,
    };
    addTask(newTask); 
    setShowForm(false);
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setIsFormVisible(false);
  };

  return (
    <div className="fixed top-1/3 left-1/3 right-1/3 bg-white p-4 border border-gray-300 shadow-lg rounded-md z-50">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-bold">Add New Task</h3>
      <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
        <span className="text-xl">&times;</span>
      </button>
    </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
          </div>
          <div className="input-group">
            <label htmlFor="start-time">Start Time</label>
            <input type="time" id="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="input-group">
            <label htmlFor="end-time">End Time</label>
            <input type="time" id="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add Task
            </button>
          </div>
        </form>
        </div>
  );

};

export default NewTaskForm;