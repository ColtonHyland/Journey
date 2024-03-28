'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import fetchGoals from '../app/utils/fetchGoals';
import addGoal from '../app/utils/addGoal';
import deleteGoal from '../app/utils/deleteGoal';

const DailyGoalsContainer = () => {
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    fetchGoals(setGoals, setLoading);
  }, []);

  const handleAddGoal = async () => {
    await addGoal(newGoalTitle, () => fetchGoals(setGoals, setLoading));
    setNewGoalTitle('');
  };

  const handleDeleteGoal = async (goalId) => {
    await deleteGoal(goalId, () => fetchGoals(setGoals, setLoading));
  };

   return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Today&apos;s Goals</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder="Add a new goal"
          className="input input-bordered w-full max-w-xs"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newGoalTitle.trim() !== '') {
              handleAddGoal();
            }
          }}
        />
        <button onClick={handleAddGoal} className="btn btn-primary ml-2">
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.goal_id} className="mb-2 flex justify-between items-center">
              <Link href={`/goals/${goal.goal_id}`}>
                {goal.title}
              </Link>
              <span className="cursor-pointer" onClick={() => handleDeleteGoal(goal.goal_id)}>X</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default DailyGoalsContainer;