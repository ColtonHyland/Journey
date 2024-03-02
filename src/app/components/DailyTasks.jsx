"use client";
// import getDailyTasks from '../api/getDailyTasks/route';
// import getUserByEmail from '../api/getUserByEmail/route';
import { useSession } from 'next-auth/react'; // Import useSession from NextAuth
import React, { useEffect, useState } from 'react';



const DailyTasks = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const isSessionLoading = status === "loading";
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState(''); // State to track input field value
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assume getDailyTasks is an async function that fetches tasks
    console.log("session: ", session);
    getDailyTasks() // Call the getDailyTasks route
    //   .then((data) => {
    //     setTasks(data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching daily tasks:', error);
    //     setLoading(false);
    //   });
  }, [session]);

  useEffect(() => {
    if (!isSessionLoading && session) {
      // Now you have access to the session object
      // You can fetch the user's tasks or anything related to the user
    }
  }, [session, isSessionLoading]);

  const getDailyTasks = async () => {
    try {
      const response = await fetch('/api/getDailyTasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({
        //   user_id: userId,
        //   type: "task", // Assuming type is required and set to "task" for daily tasks
        // }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.result; // Return the tasks
      } else {
        // Handle server errors or invalid responses
        console.error("Failed to fetch daily tasks");
      }
    } catch (error) {
      console.error("Failed to fetch daily tasks:", error);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return; // Prevent adding empty tasks
  
    try {
      const response = await fetch('/api/addDailyTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
          userId: session.user.id,
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
          {/* {tasks.map((task) => (
            <li key={task.task_id} className="mb-2 flex items-center">
              <input type="checkbox" className="mr-2" />
              {task.title}
            </li>
          ))} */}
        </ul>
      )}
    </div>
  );
};

export default DailyTasks;