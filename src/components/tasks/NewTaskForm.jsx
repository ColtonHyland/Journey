import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import TimeSelector from "./TimeSelector";
import { useTasks } from "@/app/context/TaskContext";
import { formatInTimeZone } from "date-fns-tz";
import Modal from "./Modal";
import { MdClose } from 'react-icons/md';

const NewTaskForm = ({ setShowForm, date }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [repeat, setRepeat] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [repeatUntil, setRepeatUntil] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [error, setError] = useState("");
  const { tasks, addTask } = useTasks();

  useEffect(() => {
    // Set initial times considering the user's local timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    setStartTime(formatInTimeZone(now, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    setEndTime(
      formatInTimeZone(
        new Date(now.getTime() + 15 * 60000),
        timeZone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      )
    );
  }, [date]);

  const handleStartTimeChange = (isoTime) => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const parsedTime = new Date(isoTime);
      setStartTime(
        formatInTimeZone(parsedTime, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX")
      );
      const endDate = new Date(parsedTime.getTime() + 15 * 60000);
      setEndTime(
        formatInTimeZone(endDate, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX")
      );
    } catch (error) {
      console.error("Error parsing date:", error);
      setError("Failed to parse start time");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!assignedDate || !startTime || !endTime) {
      setError("Please ensure all date and time fields are filled correctly.");
      return;
    }

    const startDateTime = new Date(
      `${assignedDate}T${startTime.substring(11, 19)}`
    );
    const endDateTime = new Date(
      `${assignedDate}T${endTime.substring(11, 19)}`
    );

    // Conflict checking
    const newTaskInterval = { start: startDateTime, end: endDateTime };
    for (const task of tasks) {
      const taskStart = new Date(task.start_time);
      const taskEnd = new Date(task.end_time);
      if (newTaskInterval.start < taskEnd && newTaskInterval.end > taskStart) {
        if (
          !(
            newTaskInterval.start.getTime() === taskEnd.getTime() ||
            newTaskInterval.end.getTime() === taskStart.getTime()
          )
        ) {
          setError("Task times cannot overlap with existing tasks.");
          return;
        }
      }
    }

    const daysOfWeekSelected = Object.entries(daysOfWeek)
      .filter(([_, checked]) => checked)
      .map(([day, _]) => day);

    const newTask = {
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime, // Already in UTC format
      end_time: endTime, // Already in UTC format
      repeat: repeat,
      repeatUntil: repeat ? repeatUntil : undefined,
      daysOfWeek: repeat ? daysOfWeekSelected : undefined,
    };

    try {
      await addTask(newTask);
      setShowForm(false);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      setRepeat(false);
      setDaysOfWeek({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      });
      setError("");
    } catch (error) {
      console.error("Error during form submission:", error);
      setError("Failed to create task: " + error.message);
    }
  };

  return (
    <Draggable handle=".handle">
      <div
        className="absolute top-1/4 left-1/4 right-1/4 bg-white p-4 border border-gray-300 shadow-lg rounded-md z-50 handle"
        style={{ cursor: "move", width: "30%" }}
      >
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-500 hover:text-gray-700 absolute right-2 top-2"
        >
          <MdClose />
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
              <div className="text-gray-600 text-sm">Start</div>
              <TimeSelector id="start-time" onChange={handleStartTimeChange} />
            </div>
            <div className="flex-1 pl-2">
              <div className="text-gray-600 text-sm">End</div>
              <TimeSelector
                id="end-time"
                onChange={(time) => setEndTime(time)}
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="repeat"
              checked={repeat}
              onChange={(e) => {
                setRepeat(e.target.checked);
                setShowModal(e.target.checked);
              }}
            />
            <label htmlFor="repeat"> Repeat</label>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <form>
                <label htmlFor="repeat-until">Repeat until:</label>
                <input
                  type="date"
                  id="repeat-until"
                  value={repeatUntil}
                  onChange={(e) => setRepeatUntil(e.target.value)}
                />
                {Object.keys(daysOfWeek).map((day) => (
                  <div key={day}>
                    <input
                      type="checkbox"
                      id={day}
                      checked={daysOfWeek[day]}
                      onChange={(e) =>
                        setDaysOfWeek({
                          ...daysOfWeek,
                          [day]: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor={day}>{day}</label>
                  </div>
                ))}
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Confirm
                </button>
              </form>
            </Modal>
          )}
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
