"use client"

import React, { useEffect, useState } from 'react';

const DailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch daily tasks when the component mounts
    fetch('/api/get-daily-tasks') // Replace with the actual API route
      .then((response) => response.json())
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