import React from 'react';

const DayTasksModal = ({ isOpen, onClose, dayTasks, onTaskUpdate, onTaskDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Tasks for {dayTasks.date}</h2>
        <button onClick={onClose}>Close</button>
        {dayTasks.tasks.length > 0 ? (
          <ul>
            {dayTasks.tasks.map(task => (
              <li key={task.id}>
                {task.title}
                {/* Implement onTaskUpdate and onTaskDelete as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks for this day.</p>
        )}
        {/* Optionally, add form to create a new task */}
      </div>
    </div>
  );
};

export default DayTasksModal;