'use client';
import React from 'react';
import Link from 'next/link';
import { useGoals } from '@/app/context/GoalContext';

const CurrentGoalItem = ({ goal }) => {
  const { deleteGoal } = useGoals();

  const handleDelete = async () => {
    await deleteGoal(goal.goal_id);
  };

  return (
    <li className="mb-2 flex justify-between items-center p-2 bg-gray-100 rounded">
      <Link href={`/goals/${goal.goal_id}`}>
        <a className="font-bold">{goal.title}</a>
      </Link>
      <button onClick={handleDelete} className="text-red-500 hover:text-red-700 ml-2">
        X
      </button>
    </li>
  );
};

export default CurrentGoalItem;
