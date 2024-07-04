'use client';
import React from 'react';
import Link from 'next/link';
import { useGoals } from '@/app/context/GoalContext';

const CurrentGoalItem = ({ goal }) => {
  const { deleteGoal } = useGoals();

  const handleDelete = async () => {
    await deleteGoal(goal.goal_id);
  };

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <li className="mb-2 flex justify-between items-center p-2 bg-gray-100 rounded">
      <div className="flex items-center">
        <Link href={`/goals/${goal.goal_id}`}>
          <p className="font-bold">{goal.title}</p>
        </Link>
        <span className="mx-2">•</span>
        <span className="text-sm">{formatDate(goal.due_date)}</span>
      </div>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-2">
        X
      </button>
    </li>
  );
};

export default CurrentGoalItem;
