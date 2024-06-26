import React, { useState, useEffect, useRef } from "react";
import TimeSelector from "./TimeSelector";
import { useTasks } from "@/app/context/TaskContext";
import { formatInTimeZone } from "date-fns-tz";
import RepeatOptions from "./RepeatOptions";
import { MdClose } from "react-icons/md";
import Tooltip from "@/components/utils/Tooltip";

const NewTaskForm = ({ setShowForm, date, initialTimes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState(initialTimes.startTime);
  const [endTime, setEndTime] = useState(initialTimes.endTime);
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
  const [timeConflictWarning, setTimeConflictWarning] = useState("");
  const { tasks, addTask, timeConflict } = useTasks();
  const timerRef = useRef(null);
  const [startTimeSelectorOpen, setStartTimeSelectorOpen] = useState(false);
  const [endTimeSelectorOpen, setEndTimeSelectorOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialTimes.startTime && initialTimes.endTime) {
      setStartTime(initialTimes.startTime);
      setEndTime(initialTimes.endTime);
    } else {
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
    }
  }, [initialTimes]);

  const handleStartTimeChange = (isoTime) => {
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const parsedTime = new Date(isoTime);
      const newStartTime = formatInTimeZone(
        parsedTime,
        timeZone,
        "yyyy-MM-dd'T'HH:mm:ssXXX"
      );
      setStartTime(newStartTime);

      const parsedEndTime = new Date(endTime);
      if (parsedEndTime <= parsedTime) {
        setEndTime(
          formatInTimeZone(
            new Date(parsedTime.getTime() + 15 * 60000),
            timeZone,
            "yyyy-MM-dd'T'HH:mm:ssXXX"
          )
        );
      }
      hideTooltip();
    } catch (error) {
      setError("Failed to parse start time");
    }
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    console.log(`Changed End Time: ${time}`);
    hideTooltip();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!assignedDate || !startTime || !endTime) {
      setError("Please ensure all date and time fields are filled correctly.");
      setIsSubmitting(false);
      return;
    }

    const startDateTime = new Date(
      `${assignedDate}T${startTime.substring(11, 19)}`
    );
    const endDateTime = new Date(
      `${assignedDate}T${endTime.substring(11, 19)}`
    );

    console.log(`${title}
      Start Time: ${startTime}
      End Time: ${endTime}`)

    if (endDateTime <= startDateTime) {
      setTimeConflictWarning("End time must be later than start time");
      showTooltip();
      setIsSubmitting(false);
      return;
    }

    const newTask = {
      title,
      description,
      assigned_date: assignedDate,
      start_time: startTime,
      end_time: endTime,
      repeat: Object.values(daysOfWeek).some((day) => day),
      daysOfWeek: Object.keys(daysOfWeek).filter((day) => daysOfWeek[day]),
      repeatUntil: repeatUntil || null,
    };

    if (timeConflict(newTask)) {
      setTimeConflictWarning("Time conflicts with another task");
      showTooltip();
      setIsSubmitting(false);
      return;
    } else {
      setTimeConflictWarning("");
    }

    try {
      await addTask(newTask);
      setShowForm(false);
      resetForm();
    } catch (error) {
      setError("Failed to create task: " + error.message);
      setIsSubmitting(false);
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

  const showTooltip = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTimeConflictWarning("");
    }, 2500);
  };

  const hideTooltip = () => {
    console.log("Hiding tooltip");
    clearTimeout(timerRef.current);
    setTimeConflictWarning("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <div className="text-gray-500 flex justify-between items-center mb-4">
          <h2>New Task</h2>
          <button
            onClick={() => setShowForm(false)}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <MdClose size={24} />
          </button>
        </div>
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
            <div>
              <label
                htmlFor="assignedDate"
                className="block text-sm font-medium text-gray-700"
              >
                Assigned Date
              </label>
              <input
                type="date"
                id="assigned-date"
                value={assignedDate}
                onChange={(e) => setAssignedDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                required
              />
            </div>
            <div className="flex justify-between">
              <div className="flex-1 pr-2">
                <div className="text-gray-600 text-sm">Start</div>
                <TimeSelector
                  id="start-time"
                  onChange={handleStartTimeChange}
                  isOpen={startTimeSelectorOpen}
                  setIsOpen={setStartTimeSelectorOpen}
                  initialTime={startTime}
                />
              </div>
              <div className="flex-1 pl-2 relative">
                <div className="text-gray-600 text-sm">End</div>
                <TimeSelector
                  id="end-time"
                  onChange={handleEndTimeChange}
                  isOpen={endTimeSelectorOpen}
                  setIsOpen={setEndTimeSelectorOpen}
                  initialTime={endTime}
                />
                <Tooltip
                  message={timeConflictWarning}
                  visible={
                    !!timeConflictWarning &&
                    !startTimeSelectorOpen &&
                    !endTimeSelectorOpen
                  }
                />
              </div>
            </div>
            <div>
              <input
                type="checkbox"
                id="repeat"
                checked={Object.values(daysOfWeek).some((day) => day)}
                onChange={handleRepeatChange}
              />
              <label htmlFor="repeat"> Repeat</label>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <button
              type="submit"
              className={`mt-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
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
