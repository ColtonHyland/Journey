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

    const addTask = (newTaskDetails) => {
      // Assign a temporary local ID
      const tempId = `optimistic-${Date.now()}`;
      const optimisticTask = { ...newTaskDetails, task_id: tempId, pending: true };
      setTasks(currentTasks => [optimisticTask, ...currentTasks]);
  
      // Asynchronously save the task to the server
      (async () => {
          try {
              const response = await fetch('/api/tasks', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newTaskDetails),
              });
              if (!response.ok) throw new Error('Failed to add task');
              const savedTask = await response.json();
  
              // Replace the optimistic task with the saved task
              setTasks(currentTasks => 
                  currentTasks.map(task => 
                      task.task_id === tempId ? {  ...task, ...savedTask, pending: false } : task
                  )
              );
          } catch (error) {
              setError(error.message);
              // Optionally remove or mark the task as failed
              setTasks(currentTasks => currentTasks.filter(task => task.task_id !== tempId));
          }
      })();
    };

  const deleteTask = async (taskId) => {
    // Optimistically remove the task from the UI
    setTasks(currentTasks => currentTasks.filter(task => task.task_id !== taskId));

    // Check if the task is pending server confirmation
    const taskToDelete = tasks.find(task => task.task_id === taskId);
  if (taskToDelete && taskToDelete.pending) {
    // If the task is pending, it means it's optimistic, and we don't need to call the server
    return;
  }
    // Proceed with server deletion for confirmed tasks
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // At this point, the task is already removed from the UI, and the server has been updated
    } catch (error) {
      // If an error occurs, you might choose to handle it, e.g., by showing an error message to the user
      setError(error.message);
      // Consider adding rollback logic here if necessary
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