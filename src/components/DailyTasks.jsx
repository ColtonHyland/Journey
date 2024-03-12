"use client";
// import getDailyTasks from '../api/getDailyTasks/route';
// import getUserByEmail from '../api/getUserByEmail/route';
import { useSession } from 'next-auth/react'; // Import useSession from NextAuth
import React, { useEffect, useState } from 'react';

const DailyTasks = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      getDailyTasks();
      console.log("Tasks:", tasks);
    }
    
  }, [status]);

  const getDailyTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/getDailyTasks`, {
        method: 'GET',
        credentials: 'include',
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch daily tasks");
      }
  
      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;

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

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');

    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteSelectedTasks = async () => {
    // Assuming the tasks have an 'id' property
    try {
      for (const taskId of selectedTasks) {
        const response = await fetch(`/api/tasks/${taskId}`, { 
          method: 'DELETE',
          credentials: 'include' });
        if (!response.ok) throw new Error("Failed to delete task");
        // Assuming you get the deleted task as response for confirmation
        const deletedTask = await response.json();
        console.log(`Deleted task: ${deletedTask.id}`);
      }
      // Refresh the tasks list after deletion
      getDailyTasks();
      setSelectedTasks(new Set()); // Clear selection
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleTaskSelection = (taskId) => {
    const newSelectedTasks = new Set(selectedTasks);
    if (selectedTasks.has(taskId)) {
      newSelectedTasks.delete(taskId);
    } else {
      newSelectedTasks.add(taskId);
    }
    setSelectedTasks(newSelectedTasks);
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
        <>
          <ul>
            {tasks.map((task) => (
              <li key={task.task_id} className="mb-2 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedTasks.has(task.task_id)}
                  onChange={() => handleTaskSelection(task.task_id)}
                />
                {task.title}
              </li>
            ))}
          </ul>
          {selectedTasks.size > 0 && (
            <button
              onClick={deleteSelectedTasks}
              className="mt-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Selected Tasks
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default DailyTasks;