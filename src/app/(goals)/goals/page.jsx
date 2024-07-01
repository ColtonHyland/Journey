'use client';
import React, { useState } from "react";
import Link from "next/link";
import GoalDisplay from "@/components/goals/GoalDisplay";
import TitleDialog from "@/components/goals/TitleDialog";
import { useRouter } from 'next/navigation';

const Goals = () => {
  const [showTitleDialog, setShowTitleDialog] = useState(false);
  const router = useRouter();

  const handleNewGoalClick = () => {
    setShowTitleDialog(true);
  };

  const handleTitleDialogCancel = () => {
    setShowTitleDialog(false);
  };

  const handleTitleDialogContinue = (title) => {
    setShowTitleDialog(false);
    router.push(`/goals/new?title=${encodeURIComponent(title)}`);
  };

  return (
    <div>
      <div
        className="flex flex-col overflow-hidden"
        style={{ height: `calc(100vh - var(--appbar-height, 70px))`}}
      >
        <div className="flex justify-start space-x-4 m-4">
        <button onClick={handleNewGoalClick} className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900">
          New Goal
        </button>
        </div>
        <h1 className="text-2xl font-semibold ml-4 mb-2">Goals</h1>
        <GoalDisplay />
      </div>
      {showTitleDialog && (
        <TitleDialog
          onCancel={handleTitleDialogCancel}
          onContinue={handleTitleDialogContinue}
        />
      )}
    </div>
  );
};

export default Goals;
