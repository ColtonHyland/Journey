import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import TimeSelector from './TimeSelector';
import { useTasks } from '@/app/context/TaskContext';

const NewTaskForm = ({ setShowForm, date }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState('');
  const { addTask } = useTasks();

  useEffect(() => {
    const current = new Date();
    current.setMinutes(Math.ceil(current.getMinutes() / 15) * 15);
    const initialTime = current.toISOString();
    setStartTime(initialTime);
    setEndTime(new Date(current.getTime() + 15 * 60000).toISOString());
  }, [date]);

  const handleStartTimeChange = (isoTime) => {
    setStartTime(isoTime);
    const endDate = new Date(new Date(isoTime).getTime() + 15 * 60000);
    setEndTime(endDate.toISOString());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Assigned Date:", assignedDate);
    console.log("Start Time:", startTime);
    console.log("End Time:", endTime);
  
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
  
    console.log("ISO Start Date:", startDate.toISOString());
    console.log("ISO End Date:", endDate.toISOString());
  
    if (endDate <= startDate) {
      setError("End time cannot be before or equal to start time.");
      return;
    }
  
    const newTask = {
      title,
      description,
      assigned_date: startDate.toISOString(),
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
    };
  
    try {
      await addTask(newTask);
      setShowForm(false);
      setTitle('');
      setDescription('');
      setStartTime('');
      setEndTime('');
      setError('');
    } catch (error) {
      console.error("Failed to create task:", error);
      setError("Failed to create task: " + error.message);
    }
  };

  return (
    <Draggable handle=".handle">
      <div className="absolute top-1/4 left-1/4 right-1/4 bg-white p-4 border border-gray-300 shadow-lg rounded-md z-50 handle" style={{ cursor: 'move', width: '30%' }}>
        <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700 absolute right-2 top-2">
          <span className="text-xl">&times;</span>
        </button>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <input
            type="text"
            id="title"
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
          <textarea
            id="description"
            placeholder="Task details"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="3"
            required
          />
          <input
            type="date"
            id="assigned-date"
            value={assignedDate}
            onChange={(e) => setAssignedDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
          <div className="flex justify-between">
            <div className="flex-1 pr-2">
              <TimeSelector
                id="start-time"
                onChange={handleStartTimeChange}
              />
            </div>
            <div className="flex-1 pl-2">
              <TimeSelector
                id="end-time"
                onChange={(time) => setEndTime(time)}
              />
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
          >
            Confirm
          </button>
        </form>
      </div>
    </Draggable>
  );
};

export default NewTaskForm;
