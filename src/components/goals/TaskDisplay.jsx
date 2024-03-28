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
  }, [getTasks]);

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

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/goals/${goalId}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      console.log('Task deleted successfully:', taskId);
      // Refresh task list after deletion
      getTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Tasks</h3>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">Add Task</button>
      </div>
      {showForm && <NewTaskForm goalId={goalId} onTaskAdded={getTasks} />}
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.task_id} className="py-4 flex justify-between items-center">
            <div>
              <span className="text-sm font-medium text-gray-900">{task.title}</span>
              <span className="text-sm text-gray-500">{task.description}</span>
            </div>
            <button onClick={() => deleteTask(task.task_id)} className="text-red-500 hover:text-red-700">X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDisplay;