import React, { useState, useEffect } from "react";
import TimeSelector from "./TimeSelector";
import { useTasks } from "@/app/context/TaskContext";
import { formatInTimeZone } from "date-fns-tz";
import RepeatOptions from "./RepeatOptions";
import { MdClose } from "react-icons/md";

const NewTaskForm = ({ setShowForm, date }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [daysOfWeek, setDaysOfWeek] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });
  const [repeatUntil, setRepeatUntil] = useState("");
  const [error, setError] = useState("");
  const { tasks, addTask } = useTasks();

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const now = new Date();
    now.setMinutes(Math.ceil(now.getMinutes() / 15) * 15);
    setStartTime(formatInTimeZone(now, timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
    setEndTime(formatInTimeZone(new Date(now.getTime() + 15 * 60000), timeZone, "yyyy-MM-dd'T'HH:mm:ssXXX"));
  }, [date]);

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

    if (!assignedDate || !startTime || !endTime) {
      setError("Please ensure all date and time fields are filled correctly.");
      return;
    }

    const startDateTime = new Date(`${assignedDate}T${startTime.substring(11, 19)}`);
    const endDateTime = new Date(`${assignedDate}T${endTime.substring(11, 19)}`);

    const newTask = {
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime,
      end_time: endTime,
      repeat: Object.values(daysOfWeek).some(day => day),
      daysOfWeek: Object.keys(daysOfWeek).filter(day => daysOfWeek[day]),
      repeatUntil: repeatUntil || null,
    };

    try {
      await addTask(newTask);
      setShowForm(false);
      resetForm();
    } catch (error) {
      setError("Failed to create task: " + error.message);
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setAssignedDate(date);
    setStartTime("");
    setEndTime("");
    setShowRepeatOptions(false);
    setDaysOfWeek({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
    setRepeatUntil("");
    setError("");
  };

  const handleCancelRepeat = () => {
    setShowRepeatOptions(false);
  };

  const handleConfirmRepeat = () => {
    setShowRepeatOptions(false);
  };

  const handleRepeatChange = (e) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      setDaysOfWeek({
        Sunday: false,
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
      });
      setRepeatUntil("");
    }
    setShowRepeatOptions(isChecked);
  };

  return (
  
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
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
        {!showRepeatOptions ? (
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
                <TimeSelector id="end-time" onChange={(time) => setEndTime(time)} />
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                id="repeat"
                checked={Object.values(daysOfWeek).some(day => day)}
                onChange={handleRepeatChange}
              />
              <label htmlFor="repeat"> Repeat</label>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900">
              Confirm
            </button>
          </form>
        ) : (
          <RepeatOptions
            daysOfWeek={daysOfWeek}
            setDaysOfWeek={setDaysOfWeek}
            onConfirm={handleConfirmRepeat}
            onCancel={handleCancelRepeat}
            repeatUntil={repeatUntil}
            setRepeatUntil={setRepeatUntil}
          />
        )}
      </div>
      </div>
  );
};

export default NewTaskForm;
