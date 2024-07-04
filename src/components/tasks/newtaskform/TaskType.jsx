const TaskType = ({ taskType, setTaskType }) => {
  return (
    <div>
      <select
        id="task-type"
        value={taskType}
        onChange={(e) => setTaskType(e.target.value)}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
      >
        <option value="work">Work</option>
        <option value="errand">Home</option>
        <option value="Activity">Activity</option>
        <option value="other">Other</option>
      </select>
    </div>
  );
};

export default TaskType;
