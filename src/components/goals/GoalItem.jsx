import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import ConfirmationDialog from '../utils/ConfirmationDialog';
import Link from 'next/link';
import { useGoals } from '@/app/context/GoalContext';

const GoalItem = ({ goal }) => {
  const { deleteGoal } = useGoals();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    deleteGoal(goal.goal_id);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="border p-4 mb-4 relative">
      <MdClose
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleDelete}
      />
      <Link href={`/goals/${goal.goal_id}`}>
        <h2 className="text-xl font-bold cursor-pointer">{goal.title || 'No Title'}</h2>
      </Link>
      <p className="text-gray-500">Due Date: {new Date(goal.due_date).toLocaleDateString()}</p>
      <p>{goal.description}</p>

      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure you want to delete this goal?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          navigateTo={`/goals`}
        />
      )}
    </div>
  );
};

export default GoalItem;
