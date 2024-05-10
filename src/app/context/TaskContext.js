import React, { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children, date }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const timeConflict = (newTask) => {
    console.log("Checking for conflicts with new task:", newTask);
    return tasks.some(task => {
        const taskStartStr = `${task.assigned_date} ${task.start_time}:00`;
        const taskEndStr = `${task.assigned_date} ${task.end_time}:00`;
        const taskStart = new Date(taskStartStr);
        const taskEnd = new Date(taskEndStr);

        const newTaskStartStr = `${newTask.assigned_date} ${newTask.start_time}:00`;
        const newTaskEndStr = `${newTask.assigned_date} ${newTask.end_time}:00`;
        const newTaskStart = new Date(newTaskStartStr);
        const newTaskEnd = new Date(newTaskEndStr);

        console.log(`Task being checked against: `, { taskStartStr, taskEndStr, taskStart, taskEnd });
        console.log(`New task times: `, { newTaskStartStr, newTaskEndStr, newTaskStart, newTaskEnd });

        const startConflict = newTaskStart < taskEnd && newTaskStart >= taskStart;
        const endConflict = newTaskEnd > taskStart && newTaskEnd <= taskEnd;
        const exactStartConflict = newTaskStart.getTime() === taskStart.getTime();
        const exactEndConflict = newTaskEnd.getTime() === taskEnd.getTime();

        console.log(`Conflict details: `, { startConflict, endConflict, exactStartConflict, exactEndConflict });

        return startConflict || endConflict || exactStartConflict || exactEndConflict;
    });
};

  const fetchTasks = async () => {
    setLoading(true);
    try {
        const response = await fetch(`/api/tasks/dailyTasks/${date}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        if (!response.ok) throw new Error('Failed to fetch tasks');
        const data = await response.json();
        console.log("Tasks fetched: ", data.dailyTasks.map(task => ({
            assigned_date: task.assigned_date,
            start_time: task.start_time,
            end_time: task.end_time
        })));
        setTasks(data.dailyTasks);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        setError(error.message);
    } finally {
        setLoading(false);
    }
};

const addTask = async (newTaskDetails) => {
  console.log("Submitting new task with details:", newTaskDetails); // Log the task details being submitted

  if (timeConflict(newTaskDetails)) {
    console.log("Conflict detected, cannot add task.");
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
    console.log("Task added successfully:", addedTask); // Log the response from the server
    fetchTasks(); // Refresh the tasks list
  } catch (error) {
    console.error("Error adding task:", error);
    setError(error.message);
  }
};

  const deleteTask = async (taskId) => {
    // Optimistically remove the task from the UI
    const newTasks = tasks.filter((task) => task.task_id !== taskId);
    setTasks(newTasks);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to delete task");
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
    <TaskContext.Provider
      value={{ tasks, loading, error, addTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
};
