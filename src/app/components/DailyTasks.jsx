"use client";
import getDailyTasks from '../api/getDailyTasks/route';
import getUserByEmail from '../api/getUserByEmail/route';
import { useSession } from 'next-auth/react'; // Import useSession from NextAuth
import React, { useEffect, useState } from 'react';

const DailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState(''); // State to track input field value
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume getDailyTasks is an async function that fetches tasks
    getDailyTasks() // Call the getDailyTasks route
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching daily tasks:', error);
        setLoading(false);
      });
  }, []);

  const addTask = () => {
    if (!newTaskTitle.trim()) return; // Prevent adding empty tasks
    const newTask = {
      task_id: Math.random().toString(36).substr(2, 9), // Generate a pseudo-random ID for the example
      title: newTaskTitle,
      // Include any other task properties here
    };
    setTasks([...tasks, newTask]); // Add the new task to the existing tasks
    setNewTaskTitle(''); // Reset input field
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Daily Tasks</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Add a new task"
          className="mr-2 p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addTask}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id} className="mb-2 flex items-center">
              <input type="checkbox" className="mr-2" />
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DailyTasks;