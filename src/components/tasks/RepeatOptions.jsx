import React from "react";

const RepeatOptions = ({ daysOfWeek, setDaysOfWeek, onConfirm, onCancel, repeatUntil, setRepeatUntil }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="repeat-until">Repeat Until:</label>
        <input
          type="date"
          id="repeat-until"
          value={repeatUntil}
          onChange={(e) => setRepeatUntil(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        />
      </div>
      {Object.keys(daysOfWeek).map((day) => (
        <div key={day} className="flex items-center">
          <input
            type="checkbox"
            id={day}
            checked={daysOfWeek[day]}
            onChange={(e) =>
              setDaysOfWeek({ ...daysOfWeek, [day]: e.target.checked })
            }
            className="mr-2"
          />
          <label htmlFor={day}>{day}</label>
        </div>
      ))}
      <div className="flex justify-between mt-4">
        <button type="button" onClick={onCancel} className="py-2 px-4 bg-white text-black border border-gray-300 rounded-md">
          Cancel
        </button>
        <button type="button" onClick={onConfirm} className="py-2 px-4 bg-black text-white rounded-md">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default RepeatOptions;
