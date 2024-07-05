'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { validateAndFormatDate } from "../utils/validateDate";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children, date }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formattedDate = date ? validateAndFormatDate(date) : new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchTasks();
  }, [formattedDate]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks/dailyTasks/${formattedDate}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch tasks");
      const data = await response.json();
      setTasks(data.dailyTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const timeConflict = (newTask, ignoreTaskId = null) => {
    return tasks.some((task) => {
      if (ignoreTaskId && task.task_id === ignoreTaskId) {
        return false;
      }
      const taskAssignedDate = new Date(task.assigned_date).toISOString().split('T')[0];
      const newTaskAssignedDate = new Date(newTask.assigned_date).toISOString().split('T')[0];
      if (taskAssignedDate !== newTaskAssignedDate) {
        return false;
      }
      const taskStartTime = new Date(task.start_time).getTime();
      const taskEndTime = new Date(task.end_time).getTime();
      const newTaskStartTime = new Date(newTask.start_time).getTime();
      const newTaskEndTime = new Date(newTask.end_time).getTime();
      return (newTaskStartTime < taskEndTime && newTaskEndTime > taskStartTime);
    });
  };

  const addTask = async (newTaskDetails) => {
    if (timeConflict(newTaskDetails)) {
      setError("Cannot add task that overlaps with another task.");
      return;
    }
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTaskDetails),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add task:", errorData);
        throw new Error("Failed to add task");
      }
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error("Error adding task:", error);
      setError(error.message);
    }
  };

  const deleteTask = async (taskId) => {
    const newTasks = tasks.filter((task) => task.task_id !== taskId);
    setTasks(newTasks);
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to delete task");
    } catch (error) {
      setError(error.message);
      fetchTasks();
    }
  };

  const editTask = async (updatedTask) => {
    if (timeConflict(updatedTask, updatedTask.task_id)) {
      setError("Cannot update task due to time conflict.");
      return;
    }
    try {
      const response = await fetch(`/api/tasks/${updatedTask.task_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update task:", errorData);
        throw new Error("Failed to update task");
      }
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        timeConflict,
        addTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
