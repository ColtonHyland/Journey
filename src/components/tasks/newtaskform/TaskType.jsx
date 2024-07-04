const TaskType = ({ taskType, setTaskType }) => {
  return (
    <div>
      <label htmlFor="task-type" className="block text-sm font-medium text-gray-700">
        Task Type
      </label>
      <select
        id="task-type"
        value={taskType}
        onChange={(e) => setTaskType(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="work">Work</option>
        <option value="errand">Errand</option>
        <option value="chore">Chore</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default TaskType;
