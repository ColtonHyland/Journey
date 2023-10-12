"use client";
import getDailyTasks from '../api/getDailyTasks/route';
import getUserByEmail from '../api/getUserByEmail/route';
import { useSession } from 'next-auth/react'; // Import useSession from NextAuth
import React, { useEffect, useState } from 'react';

const DailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect((user_id) => {
    // Fetch daily tasks when the component mounts
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

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Daily Tasks</h2>
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.task_id} className="mb-2">
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