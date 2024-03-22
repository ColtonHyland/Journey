const fetchGoals = async (setGoals, setLoading) => {
  setLoading(true);
  try {
    const response = await fetch(`/api/goals`, {
      method: 'GET',
      credentials: 'include',
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

export default fetchGoals;