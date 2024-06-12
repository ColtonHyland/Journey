'use client';
import React, { useState } from 'react';

const GoalForm = ({ goalId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('active');
  const [specific, setSpecific] = useState('');
  const [measurable, setMeasurable] = useState('');
  const [achievable, setAchievable] = useState('');
  const [relevant, setRelevant] = useState('');
  const [timeBound, setTimeBound] = useState('');
  const [actionPlan, setActionPlan] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const goal = {
      title,
      description,
      dueDate,
      status,
      specific,
      measurable,
      achievable,
      relevant,
      timeBound,
      actionPlan,
    };
    onSave(goal);
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setStatus('active');
    setSpecific('');
    setMeasurable('');
    setAchievable('');
    setRelevant('');
    setTimeBound('');
    setActionPlan('');
  };

  const onSave = async (goal) => {
    try {
      const response = await fetch(`/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goal),
      });

      if (!response.ok) {
        throw new Error('Failed to save goal');
      }

      const result = await response.json();
      console.log('Goal saved successfully:', result);
      // Handle success (e.g., display a success message or redirect)

    } catch (error) {
      console.error('Error saving goal:', error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3" required></textarea>
      </div>
      <div>
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
        <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="planned">Planned</option>
          {/* Add more status options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="specific" className="block text-sm font-medium text-gray-700">Specific</label>
        <textarea id="specific" value={specific} onChange={(e) => setSpecific(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="2" required></textarea>
      </div>
      <div>
        <label htmlFor="measurable" className="block text-sm font-medium text-gray-700">Measurable</label>
        <textarea id="measurable" value={measurable} onChange={(e) => setMeasurable(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="2" required></textarea>
      </div>
      <div>
        <label htmlFor="achievable" className="block text-sm font-medium text-gray-700">Achievable</label>
        <textarea id="achievable" value={achievable} onChange={(e) => setAchievable(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="2" required></textarea>
      </div>
      <div>
        <label htmlFor="relevant" className="block text-sm font-medium text-gray-700">Relevant</label>
        <textarea id="relevant" value={relevant} onChange={(e) => setRelevant(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="2" required></textarea>
      </div>
      <div>
        <label htmlFor="timeBound" className="block text-sm font-medium text-gray-700">Time-Bound</label>
        <textarea id="timeBound" value={timeBound} onChange={(e) => setTimeBound(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="2" required></textarea>
      </div>
      <div>
        <label htmlFor="actionPlan" className="block text-sm font-medium text-gray-700">Action Plan</label>
        <textarea id="actionPlan" value={actionPlan} onChange={(e) => setActionPlan(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" rows="4" required></textarea>
      </div>
      <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save Goal</button>
    </form>
  );
};

export default GoalForm;
