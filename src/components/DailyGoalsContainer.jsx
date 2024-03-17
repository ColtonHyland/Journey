import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const DailyGoalsContainer = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [goals, setGoals] = useState([]);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchGoals();
    }
  console.log("Goals:", goals);
  }, [status]);

  const fetchGoals = async () => {
    setLoading(true);
    console.log("Debug: userId:", userId)
    try {
      const response = await fetch(`/api/users/${userId}/goals`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.accessToken}`
        },
      });

      if (!response.ok) throw new Error('Failed to fetch goals');

      const data = await response.json();
      setGoals(data.goals || []);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async () => {
    if (!newGoalTitle.trim()) return;

    try {
      const response = await fetch(`/api/users/${userId}/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.accessToken}`
        },
        body: JSON.stringify({
          title: newGoalTitle,
          userId: session.user.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to add goal');

      setNewGoalTitle('');
      fetchGoals();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Daily Goals</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          placeholder="Add a new goal"
          className="input input-bordered w-full max-w-xs"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && newGoalTitle.trim() !== '') {
              addGoal();
            }
          }}
        />
        <button
          onClick={addGoal}
          className="btn btn-primary ml-2"
        >
          Add
        </button>
      </div>
      {loading ? (
        <p>Loading goals...</p>
      ) : (
        <ul>
          {goals.map((goal) => (
            <li key={goal.task_id} className="mb-2">
              {goal.title}
              {/* Implement delete and update functionality */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default DailyGoalsContainer;