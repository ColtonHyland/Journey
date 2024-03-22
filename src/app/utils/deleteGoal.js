const deleteGoal = async (goalId, onSuccess) => { 
  try {
    const response = await fetch(`/api/goals/${goalId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete goal');
    }

    onSuccess(); // Refresh goals list on successful deletion
  } catch (error) {
    console.error('Error deleting goal:', error);
    console.log("deleteGoal.js: ", goalId)
  }
}

export default deleteGoal;