'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const GoalPage = ({ params }) => {
  const goalId = params.goalId;
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const response = await fetch(`/api/goals/${goalId}`);
        if (!response.ok) throw new Error('Failed to fetch goal');
        const data = await response.json();
        setGoal(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGoal();
  }, [goalId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Link href="/goals">
        Back to goals
      </Link>
      {goal ? (
        <div>
          <h1 className="text-2xl font-bold">{goal.title}</h1>
          <p className="text-gray-500">Due Date: {new Date(goal.due_date).toLocaleDateString()}</p>
          <p>{goal.description}</p>
          <p><strong>What:</strong> {goal.what}</p>
          <p><strong>Why:</strong> {goal.why}</p>
          <p><strong>Who:</strong> {goal.who}</p>
          <p><strong>Where:</strong> {goal.where}</p>
          <p><strong>Resources:</strong> {goal.resources}</p>
          <p><strong>How Much:</strong> {goal.howMuch}</p>
          <p><strong>How Many:</strong> {goal.howMany}</p>
          <p><strong>Accomplishment:</strong> {goal.accomplishment}</p>
          <p><strong>Measurable Quantifiers:</strong> {JSON.stringify(goal.measurableQuantifiers)}</p>
          <p><strong>How:</strong> {goal.how}</p>
          <p><strong>Realistic:</strong> {goal.realistic}</p>
          <p><strong>Achievable Quantifiers:</strong> {JSON.stringify(goal.achievableQuantifiers)}</p>
          <p><strong>Worthwhile:</strong> {goal.worthwhile}</p>
          <p><strong>Right Time:</strong> {goal.rightTime}</p>
          <p><strong>Matches:</strong> {goal.matches}</p>
          <p><strong>Right Person:</strong> {goal.rightPerson}</p>
          <p><strong>Applicable:</strong> {goal.applicable}</p>
          <p><strong>Milestones:</strong> {JSON.stringify(goal.milestones)}</p>
          <p><strong>Action Plan:</strong> {goal.actionPlan}</p>
          <p><strong>Status:</strong> {goal.status}</p>
        </div>
      ) : (
        <p>Goal not found.</p>
      )}
    </div>
  );
}

export default GoalPage;
