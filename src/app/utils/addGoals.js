const addGoal = async (newGoalTitle, fetchGoals) => {
  if (!newGoalTitle.trim()) return;

  try {
    const response = await fetch(`/api/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: newGoalTitle,
        status: 'active'
      }),
    });

    if (!response.ok) throw new Error('Failed to add goal');

    await fetchGoals();
  } catch (error) {
    console.error(error.message);
  }
};

export default addGoal;