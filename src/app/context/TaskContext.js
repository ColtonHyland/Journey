import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/tasks/dailyTasks', {
                method: 'GET',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();
            setTasks(data.dailyTasks);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (newTaskDetails) => {
        const optimisticTask = { ...newTaskDetails, task_id: Date.now() };
        setTasks(currentTasks => [optimisticTask, ...currentTasks]);
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTaskDetails),
            });
            if (!response.ok) throw new Error('Failed to add task');
            // fetchTasks();
            // No need to refetch all tasks; assume the task is added successfully
            // Optionally, update the task in the state with any additional data returned from the server
        } catch (error) {
            setError(error.message);
            setTasks(currentTasks => currentTasks.filter(task => task.task_id !== optimisticTask.task_id)); // Rollback if failed
        }
    };

    const deleteTask = async (taskId) => {
      console.log('taskId', taskId)
      try {
          const response = await fetch(`/api/tasks/${taskId}`, {
              method: 'DELETE',
              headers: {'Content-Type': 'application/json'},
          });
          if (!response.ok) throw new Error('Failed to delete task');
          fetchTasks(); // Refetch tasks after deletion
      } catch (error) {
          setError(error.message);
      }
  };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, loading, error, addTask, deleteTask  }}>
            {children}
        </TaskContext.Provider>
    );
};