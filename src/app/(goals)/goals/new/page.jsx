import React from "react";
import NewGoalForm from "@/components/goals/newgoalform/GoalForm";

const NewGoal = () => {
  return (
    <div>
      <div
        className="flex flex-col overflow-hidden"
        style={{ height: `calc(100vh - var(--appbar-height, 70px))` }}
      >
        <NewGoalForm />
      </div>
    </div>
  );
}

export default NewGoal;
