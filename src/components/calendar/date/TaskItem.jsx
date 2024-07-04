"use client";
import React, { useState } from "react";
import EditTask from "@/components/tasks/EditTask";
import ConfirmationDialog from "../../utils/ConfirmationDialog";
import { useTasks } from "@/app/context/TaskContext";
import { MdClose, MdModeEdit } from 'react-icons/md';

const TaskItem = ({ task, date, hourHeight = 80, index }) => {
  const { deleteTask } = useTasks();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const startTime = new Date(task.start_time);
  const endTime = new Date(task.end_time);
  const startMinutesFromMidnight =
    startTime.getHours() * 60 + startTime.getMinutes();
  const endMinutesFromMidnight = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinutesFromMidnight - startMinutesFromMidnight;
  const top = (startMinutesFromMidnight / 60) * hourHeight;
  const height = (durationMinutes / 60) * hourHeight;

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask(task.task_id);
    setIsDeleting(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const closeEdit = () => {
    setIsEditing(false);
  };

  const confirmDelete = () => {
    setShowConfirm(true);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  const colorMapping = {
    work: "bg-red-200",
    home: "bg-blue-200",
    activity: "bg-green-200",
    other: "bg-yellow-200"
  };

  const backgroundColor = colorMapping[task.type] || "bg-gray-200";

  const formatTime = (date) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    return date
      .toLocaleTimeString([], options)
      .replace(" AM", "")
      .replace(" PM", "");
  };

  const amPm = endTime.getHours() >= 12 ? " PM" : " AM";
  const formattedStartTime = formatTime(startTime);
  const formattedEndTime = formatTime(endTime);

  return (
    <>
      <div
        className={`absolute left-24 right-8 rounded-lg ${backgroundColor} text-black text-sm p-1 border border-gray-500 overflow-hidden`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          zIndex: 10,
        }}
      >
        <div className="flex justify-between items-center">
          <div>
            <span className="font-bold">{task.title}</span>
            <span className="text-xs">
              {" "}
              • {formattedStartTime} - {formattedEndTime}
              {amPm}
            </span>
          </div>
          <div className="flex">
            <button
              onClick={handleEdit}
              className="text-black focus:outline-none"
              style={{ padding: "4px", zIndex: 15 }}
            >
              <MdModeEdit />
            </button>
            <button
              onClick={confirmDelete}
              disabled={isDeleting}
              className="text-black focus:outline-none"
              style={{ padding: "4px", zIndex: 15 }}
            >
              {isDeleting ? "Deleting..." : <MdClose />}
            </button>
          </div>
        </div>
        {task.description && <p className="text-xs truncate">{task.description}</p>}
      </div>
      {isEditing && <EditTask task={task} date={date} closeEdit={closeEdit} />}
      {showConfirm && (
        <ConfirmationDialog
          message="Are you sure?"
          onConfirm={handleDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default TaskItem;
