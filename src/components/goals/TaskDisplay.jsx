'use client';
import React, { useState, useEffect } from 'react';
import NewTaskForm from './NewTaskForm';

const TaskDisplay = ({ goalId }) => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    getTasks();
  }, [goalId]);

  const getTasks = async () =>{
    try {
      const response = await fetch(`/api/goals/${goalId}/tasks`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const result = await response.json();
      setTasks(result);
      console.log('Tasks fetched successfully:', result);
      return result;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Handle error (e.g., display an error message)
    }
  };

  const addTask = async (newTaskDetails) => {
    try {
      const response = await fetch(`/api/tasks/${goalId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTaskDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to save task');
      }

      const newTask = await response.json();
      console.log('Task saved successfully:', newTask);
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      title,
      description,
      dueDate,
    };
    addTask(task);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">Add Task</button>
      </div>
      {showForm && <NewTaskForm goalId={goalId} onAddTask={addTask} />}
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.task_id} className="py-4 flex">
            <div className="ml-3 flex flex-col">
              <span className="text-sm font-medium text-gray-900">{task.title}</span>
              <span className="text-sm text-gray-500">{task.description}</span>
              <span className="text-sm text-gray-500">{task.dueDate}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDisplay;