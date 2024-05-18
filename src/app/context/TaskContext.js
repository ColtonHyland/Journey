import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children, date }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeConflict = (newTask) => {
    console.log(`New task to check: ${JSON.stringify(newTask)}`);
    console.log(`Tasks to check: ${JSON.stringify(tasks)}`);
  
    return tasks.some((task) => {
      if (task.assigned_date !== newTask.assigned_date) {
        return false;
      }

      const taskStart = new Date(task.start_time);
      const taskEnd = new Date(task.end_time);
      const newTaskStart = new Date(newTask.start_time);
      const newTaskEnd = new Date(newTask.end_time);
  
      const startConflict = newTaskStart < taskEnd && newTaskStart >= taskStart;
      const endConflict = newTaskEnd > taskStart && newTaskEnd <= taskEnd;
      const middleConflict = newTaskStart < taskStart && newTaskEnd > taskEnd;
      const exactStartConflict = newTaskStart.getTime() === taskStart.getTime();
      const exactEndConflict = newTaskEnd.getTime() === taskEnd.getTime();
  
      console.log(
        `Checking startConflict: ${startConflict},
         endConflict: ${endConflict},
         middleConflict: ${middleConflict},
         exactStartConflict: ${exactStartConflict},
         exactEndConflict: ${exactEndConflict}`
      );
  
      return (
        startConflict || endConflict || middleConflict || exactStartConflict || exactEndConflict
      );
    });
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tasks/dailyTasks/${date}`, {
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
      const addedTask = await response.json(); // Assuming the response includes the added task data
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
    if (timeConflict(updatedTask)) {
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
      const editedTask = await response.json();
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

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
