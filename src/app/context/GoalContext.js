import React, { createContext, useContext, useState, useEffect } from "react";

const GoalContext = createContext();

export const useGoals = () => useContext(GoalContext);

export const GoalProvider = ({ children }) => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/goals`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch goals");
      const data = await response.json();

      setGoals(data.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (newGoalDetails) => {
    console.log(`Adding new goal asynchronously:`, newGoalDetails);
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGoalDetails),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add goal:", errorData);
        throw new Error("Failed to add goal");
      }
      const addedGoal = await response.json(); // Assuming the response includes the added goal data
      setGoals((prevGoals) => [...prevGoals, addedGoal]);
    } catch (error) {
      console.error("Error adding goal:", error);
      setError(error.message);
    }
  };

  const deleteGoal = async (goalId) => {
    const newGoals = goals.filter((goal) => goal.goal_id !== goalId);
    setGoals(newGoals);

    try {
      const response = await fetch(`/api/goals/${goalId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to delete goal");
    } catch (error) {
      setError(error.message);
      fetchGoals();
    }
  };

  const editGoal = async (updatedGoal) => {
    try {
      const response = await fetch(`/api/goals/${updatedGoal.goal_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedGoal),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update goal:", errorData);
        throw new Error("Failed to update goal");
      }
      const editedGoal = await response.json();
      setGoals((prevGoals) =>
        prevGoals.map((goal) => (goal.goal_id === editedGoal.goal_id ? editedGoal : goal))
      );
    } catch (error) {
      console.error("Error updating goal:", error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <GoalContext.Provider
      value={{
        goals,
        loading,
        error,
        addGoal,
        editGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};
