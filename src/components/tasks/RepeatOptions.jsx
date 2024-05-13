import React from "react";

const RepeatOptions = ({ daysOfWeek, setDaysOfWeek, onConfirm, onCancel }) => {
  return (
    <div className="space-y-4">
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
