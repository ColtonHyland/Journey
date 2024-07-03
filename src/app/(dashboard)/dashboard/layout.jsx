import React, { Suspense } from "react";
import { GoalProvider } from "@/app/context/GoalContext";
import { TaskProvider } from "@/app/context/TaskContext";

export default function DashboardLayout({ children }) {
  return (
    <TaskProvider>
      <GoalProvider>
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      </GoalProvider>
    </TaskProvider>
  );
}
