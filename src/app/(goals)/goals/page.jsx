'use client';
import React from "react";
import Link from "next/link";
import GoalDisplay from "@/components/goals/GoalDisplay";

const Goals = ({ params }) => {

  return (
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
  );



};

export default Goals;

