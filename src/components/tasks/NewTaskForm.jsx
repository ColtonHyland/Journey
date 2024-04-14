'use client';
import React, { useState } from 'react';
import { useTasks } from '@/app/context/TaskContext';

const NewTaskForm = ({ date }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      assigned_date: date,
    };
    addTask(newTask); // Call the parent's function to handle the task addition

    setTitle('');
    setDescription('');

    setIsFormVisible(false); // Hide the form after submission
  };

  return (
    <div>
      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add new task +
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewTaskForm;