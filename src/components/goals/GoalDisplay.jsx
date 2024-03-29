'use client';
import React, { useState, useEffect } from 'react';

const GoalDisplay = ({ goalId }) => {
  const [goal, setGoal] = useState({});
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const getGoal = (async () =>{
      try { 
        const response = await fetch(`/api/goals/${goalId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch goal');
        }
  
        const result = await response.json();
        setGoal(result);
  
        console.log('Goal fetched successfully:', result);
        return result;
      } catch (error) {
        console.error('Error fetching goal:', error);
        // Handle error (e.g., display an error message)
      }
      
    });

    getGoal();
  }, [goalId]);


 

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Goal Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the goal.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{goal.title}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{goal.description}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Due Date</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{goal.dueDate}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Status</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{goal.status}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export default GoalDisplay;