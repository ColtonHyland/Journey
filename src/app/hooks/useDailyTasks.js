import { useEffect, useState } from 'react';

const useDailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyTasks = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/tasks/dailyTasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch daily tasks');
        }

        const data = await response.json();
        setTasks(data.dailyTasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyTasks();
  }, []);

  return { tasks, loading, error };
};

export default useDailyTasks;