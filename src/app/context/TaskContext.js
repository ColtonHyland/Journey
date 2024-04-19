import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children, date }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/tasks/dailyTasks/${date}`, {
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
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newTaskDetails),
            });
            if (!response.ok) throw new Error('Failed to add task');
            fetchTasks();
        } catch (error) {
            setError(error.message);
        }
    };

    const deleteTask = async (taskId) => {
        // Optimistically remove the task from the UI
        const newTasks = tasks.filter(task => task.task_id !== taskId);
        setTasks(newTasks);
    
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
            });
            if (!response.ok) throw new Error('Failed to delete task');
            // No need to fetchTasks if deletion is successful
        } catch (error) {
            setError(error.message);
            // Revert the UI change if there's an error
            fetchTasks();
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