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

  const colors = ["bg-blue-200", "bg-green-200", "bg-red-200"]; // Faint shades for each color
  const backgroundColor = colors[index % colors.length];

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
        className={`absolute left-24 right-8 rounded-lg ${backgroundColor} text-black text-sm p-1 border border-gray-300 overflow-hidden`}
        style={{
          top: `${top}px`,
          height: `${height}px`,
          zIndex: 10,
        }}
      >
        <button
          onClick={confirmDelete}
          disabled={isDeleting}
          className="absolute top-0 right-0 text-black focus:outline-none"
          style={{ padding: "4px", zIndex: 15 }}
        >
          {isDeleting ? "Deleting..." : <MdClose />}
        </button>
        <button
          onClick={handleEdit}
          className="absolute top-0 right-5 text-black focus:outline-none"
          style={{ padding: "4px", zIndex: 15 }}
        >
          <MdModeEdit />
        </button>
        <div>
          <span className="font-bold">{task.title}</span>
          <span className="text-xs">
            {" "}
            • {formattedStartTime} - {formattedEndTime}
            {amPm}
          </span>
        </div>{" "}
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
