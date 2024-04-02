import { useEffect, useState } from 'react';

const useDailyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchDailyTasks();

    // Event listener for task-added event
    const handleTaskAdded = () => {
      fetchDailyTasks(); // Refetch tasks when a task is added
    };

    window.addEventListener('task-added', handleTaskAdded);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('task-added', handleTaskAdded);
    };
  }, []);

  return { tasks, loading, error };
};

export default useDailyTasks;