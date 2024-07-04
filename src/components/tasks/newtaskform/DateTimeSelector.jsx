import TimeSelector from "./TimeSelector";
import Tooltip from "@/components/utils/Tooltip";

const DateTime = ({
  assignedDate,
  setAssignedDate,
  startTime,
  handleStartTimeChange,
  endTime,
  handleEndTimeChange,
  timeConflictWarning,
  startTimeSelectorOpen,
  setStartTimeSelectorOpen,
  endTimeSelectorOpen,
  setEndTimeSelectorOpen,
}) => {
  return (
    <>
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
    </>
  );
};

export default DateTime;
