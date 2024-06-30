'use client';
import React from "react";
import Link from "next/link";
import GoalDisplay from "@/components/goals/GoalDisplay";
import NewGoalForm from "@/components/goals/newgoalform/GoalForm";
import { GoalProvider } from "@/app/context/GoalContext";

const Goals = ({ params }) => {

  return (
    <GoalProvider>
    <div>
      <div
        className="flex flex-col overflow-hidden"
        style={{ height: `calc(100vh - var(--appbar-height, 70px))`}}
      >
        <Link href='/goals/new'>New Goal</Link>
        <h1 className="text-2xl font-semibold mb-4">Goals</h1>
        
        <GoalDisplay />
      </div>
    </div>
    </GoalProvider>
  );



};

export default Goals;

