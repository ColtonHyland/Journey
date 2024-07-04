"use client";
import React, { useState, useEffect } from "react";
import { MdClose } from 'react-icons/md';
import { useTasks } from "@/app/context/TaskContext";
import DateTime from "@/components/tasks/newtaskform/DateTimeSelector";
import FormFooter from "@/components/tasks/newtaskform/FormFooter";
import FormHeader from "@/components/tasks/newtaskform/FormHeader";
import TaskType from "@/components/tasks/newtaskform/TaskType";
import TimeSelector from "@/components/tasks/newtaskform/TimeSelector";
import Title from "@/components/tasks/newtaskform/Title";
import { formatInTimeZone } from "date-fns-tz";
import { Tooltip } from "react-tooltip";

const EditTask = ({ task, date, closeEdit }) => {
  const { editTask, timeConflict } = useTasks();
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState(task.start_time);
  const [endTime, setEndTime] = useState(task.end_time);
  const [taskType, setTaskType] = useState(task.type); // Add state for task type
  const [error, setError] = useState("");
  const [timeConflictWarning, setTimeConflictWarning] = useState("");

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const start = new Date(task.start_time);
    const end = new Date(task.end_time);

    setStartTime(formatInTimeZone(start, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    setEndTime(formatInTimeZone(end, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  }, [task]);

  const handleStartTimeChange = (isoTime) => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const parsedTime = new Date(isoTime);
      setStartTime(formatInTimeZone(parsedTime, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
      setEndTime(formatInTimeZone(new Date(parsedTime.getTime() + 15 * 60000), timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    } catch (error) {
      setError("Failed to parse start time");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedTask = {
      task_id: task.task_id,
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime,
      end_time: endTime,
      type: taskType, // Include task type in updated task data
    };

    if (timeConflict(updatedTask, task.task_id)) {
      setTimeConflictWarning("Time conflict with another task");
      return;
    } else {
      setTimeConflictWarning("");
    }

    if (!assignedDate || !startTime || !endTime) {
      setError("Please ensure all date and time fields are filled correctly.");
      return;
    }

    try {
      await editTask(updatedTask);
      closeEdit();
    } catch (error) {
      setError("Failed to edit task: " + error.message);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <FormHeader setShowForm={closeEdit} />
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex space-x-4">
              <div className="w-2/3">
                <Title title={title} setTitle={setTitle} />
              </div>
              <div className="w-1/3">
                <TaskType taskType={taskType} setTaskType={setTaskType} />
              </div>
            </div>
            <div>
              <textarea
                id="description"
                placeholder="Task details"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                rows="3"
                style={{ resize: "none" }}
              ></textarea>
            </div>
            <DateTime
              assignedDate={assignedDate}
              setAssignedDate={setAssignedDate}
              startTime={startTime}
              handleStartTimeChange={handleStartTimeChange}
              endTime={endTime}
              handleEndTimeChange={(time) => setEndTime(time)}
              timeConflictWarning={timeConflictWarning}
            />
            <div className="flex justify-start space-x-2">
              {timeConflictWarning && <div className="text-red-500">{timeConflictWarning}</div>}
              {error && <div className="text-red-500">{error}</div>}
            </div>
            <FormFooter error={error} isSubmitting={false} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
