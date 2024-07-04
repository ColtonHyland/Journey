import React, { useState, useEffect, useRef } from "react";
import FormHeader from "./FormHeader";
import TitleDescription from "./TitleDescription";
import DateTime from "./DateTimeSelector";
import TaskType from "./TaskType";
import RepeatOption from "./RepeatOption";
import FormFooter from "./FormFooter";
import { useTasks } from "@/app/context/TaskContext";
import { formatInTimeZone } from "date-fns-tz";

const NewTaskForm = ({ setShowForm, date, initialTimes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedDate, setAssignedDate] = useState(date);
  const [startTime, setStartTime] = useState(initialTimes.startTime);
  const [endTime, setEndTime] = useState(initialTimes.endTime);
  const [taskType, setTaskType] = useState("work");
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
      type: taskType,
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
    setTaskType("work");
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
    clearTimeout(timerRef.current);
    setTimeConflictWarning("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <FormHeader setShowForm={setShowForm} />
        {!showRepeatOptions ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <TitleDescription
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
            />
            <DateTime
              assignedDate={assignedDate}
              setAssignedDate={setAssignedDate}
              startTime={startTime}
              handleStartTimeChange={handleStartTimeChange}
              endTime={endTime}
              handleEndTimeChange={handleEndTimeChange}
              timeConflictWarning={timeConflictWarning}
              startTimeSelectorOpen={startTimeSelectorOpen}
              setStartTimeSelectorOpen={setStartTimeSelectorOpen}
              endTimeSelectorOpen={endTimeSelectorOpen}
              setEndTimeSelectorOpen={setEndTimeSelectorOpen}
            />
            <TaskType taskType={taskType} setTaskType={setTaskType} />
            <RepeatOption
              showRepeatOptions={showRepeatOptions}
              daysOfWeek={daysOfWeek}
              setDaysOfWeek={setDaysOfWeek}
              repeatUntil={repeatUntil}
              setRepeatUntil={setRepeatUntil}
              handleRepeatChange={handleRepeatChange}
              handleCancelRepeat={handleCancelRepeat}
              handleConfirmRepeat={handleConfirmRepeat}
            />
            <FormFooter error={error} isSubmitting={isSubmitting} />
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
