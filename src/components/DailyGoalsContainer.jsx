'use client';
import React, { useEffect, useState } from 'react';
import fetchGoals from '../app/utils/fetchGoals';
import addGoal from '../app/utils/addGoals';

const DailyGoalsContainer = () => {
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchGoals(setGoals, setLoading);
  }, []);

  const handleAddGoal = async () => {
    await addGoal(newGoalTitle, () => fetchGoals(setGoals, setLoading));
    setNewGoalTitle(''); // Clear the input field after adding a goal
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Today's Goals</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder="Add a new goal"
          className="input input-bordered w-full max-w-xs"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newGoalTitle.trim() !== '') {
              addGoal();
            }
          }}
        />
        <button
          onClick={handleAddGoal}
          className="btn btn-primary ml-2"
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.goal_id} className="mb-2">
              {goal.title}
              {/* Implement delete and update functionality */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default DailyGoalsContainer;