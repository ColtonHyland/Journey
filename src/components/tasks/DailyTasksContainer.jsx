"use client";
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';

const DailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');


  // const getDailyTasks = async () => {
  //   try {
  //     const response = await fetch(`/api/tasks`, {
  //       method: 'GET',
  //       credentials: 'include',
  //     });
    
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch daily tasks");
  //     }
  
  //     const data = await response.json();
  //     setTasks(data.tasks || []);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const addTask = async () => {
  //   if (!newTaskTitle.trim()) return;
  //   try {
  //     const response = await fetch(`/api/tasks`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         title: newTaskTitle,
  //       }),
  //     });
  
  //     if (!response.ok) throw new Error("Failed to add task");
  
  //     const newTask = await response.json();
  //     setTasks([...tasks, newTask]);
  //     setNewTaskTitle('');
  //   } catch (error) {
  //     console.error("Error adding new task:", error.message);
  //   }
  // };

  // const deleteSelectedTasks = async () => {
  //   // Assuming the tasks have an 'id' property
  //   try {
  //     for (const taskId of selectedTasks) {
  //       const response = await fetch(`/api/tasks`, { 
  //         method: 'DELETE',
  //         credentials: 'include' });
  //       if (!response.ok) throw new Error("Failed to delete task");
  //       // Assuming you get the deleted task as response for confirmation
  //       // const deletedTask = await response.json();
  //       // console.log(`Deleted task: ${JSON.stringify(deletedTask)}`);
  //     }
  //     // Refresh the tasks list after deletion
  //     getDailyTasks();
  //     setSelectedTasks(new Set()); // Clear selection
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  // const handleTaskSelection = (taskId) => {
  //   const newSelectedTasks = new Set(selectedTasks);
  //   if (selectedTasks.has(taskId)) {
  //     newSelectedTasks.delete(taskId);
  //   } else {
  //     newSelectedTasks.add(taskId);
  //   }
  //   setSelectedTasks(newSelectedTasks);
  // };

  return (
    <div>
      <h2>Daily Tasks</h2>
    </div>
  );
};

export default DailyTasks;