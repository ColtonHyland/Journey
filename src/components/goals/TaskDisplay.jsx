'use client';
import React, { useState, useEffect } from 'react';

const TaskDisplay = ({ goalId }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    getTasks();
  }, [goalId]);

  const getTasks = async () =>{
    try {
      const response = await fetch(`/api/tasks/${goalId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const result = await response.json();
      setTasks(result);
      console.log('Tasks fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const addTask = async (task) => {
    try {
      const response = await fetch(`/api/tasks/${goalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const result = await response.json();
      console.log('Task saved successfully:', result);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate,
    };
    addTask(task);
  };

  return (
    <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks</h3>
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.task_id} className="py-4 flex">
              <div className="ml-3 flex flex-col">
                <span className="text-sm font-medium text-gray-900">{task.title}</span>
                <span className="text-sm text-gray-500">{task.description}</span>
                <span className="text-sm text-gray-500">{task.dueDate}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Tasks for the goal.</p>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Add Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
          </div>
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
            <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Add Task</button>
        </form>
      </div>
  );
};

export default TaskDisplay;