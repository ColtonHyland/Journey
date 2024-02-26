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

  const addTask = async () => {
    if (!newTaskTitle.trim()) return; // Prevent adding empty tasks
  
    try {
      const response = await fetch('/api/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
          userId: /* the logged-in user's ID */, // You need to obtain this from the session or context
        }),
      });
  
      if (response.ok) {
        const newTask = await response.json();
        setTasks([...tasks, newTask]); // Update the local state with the new task
        setNewTaskTitle(''); // Reset input field
      } else {
        // Handle server errors or invalid responses
        console.error("Failed to add task");
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
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