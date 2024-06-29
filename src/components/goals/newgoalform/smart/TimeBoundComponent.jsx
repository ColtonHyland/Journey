import React, { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";

const TimeBoundComponent = ({ timeBound, setTimeBound }) => {
  const handleChange = (field, value) => {
    setTimeBound((prev) => ({ ...prev, [field]: value }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const newMilestones = [...timeBound.milestones];
    newMilestones[index][field] = value;
    setTimeBound((prev) => ({
      ...prev,
      milestones: newMilestones,
    }));
  };

  const addMilestone = () => {
    setTimeBound((prev) => ({
      ...prev,
      milestones: [...prev.milestones, { label: "", dueDate: "" }],
    }));
  };

  const removeMilestone = (index) => {
    const newMilestones = timeBound.milestones.filter((_, i) => i !== index);
    setTimeBound((prev) => ({ ...prev, milestones: newMilestones }));
  };

  return (
    <div>
      <h3 className="my-2 text-lg font-medium text-gray-700">Time-Bound</h3>
      <label
        htmlFor="timeBoundDueDate"
        className="block text-sm font-medium text-gray-700"
      >
        Due Date
      </label>
      <input
        type="date"
        id="timeBoundDueDate"
        value={timeBound.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
        className="mt-1 block w-1/10 border border-gray-300 rounded-md shadow-sm p-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
        required
      />

      <h4 className="mt-4 mb-2 text-md font-medium text-gray-700">
        Milestones
      </h4>
      <div className="space-y-2">
        {timeBound.milestones.map((milestone, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 mt-2 transition-transform transform duration-500 ease-in-out"
            style={{ width: "60%", margin: "0 auto" }}
          >
            <MdClose
              className="text-black cursor-pointer"
              onClick={() => removeMilestone(index)}
            />
            <div className="flex items-center w-full">
              <input
                type="text"
                value={milestone.label}
                onChange={(e) =>
                  handleMilestoneChange(index, "label", e.target.value)
                }
                placeholder="Milestone Label"
                className="mt-1 block w-3/4 border border-gray-300 rounded-md shadow-sm p-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none"
              />
              <input
                type="date"
                value={milestone.dueDate}
                onChange={(e) =>
                  handleMilestoneChange(index, "dueDate", e.target.value)
                }
                placeholder="Due Date"
                className="mt-1 block w-1/4 border border-gray-300 rounded-md shadow-sm p-2 focus:border-black focus:ring-2 focus:ring-black focus:outline-none ml-2"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={addMilestone}
          className="flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
        >
          <MdAdd className="mr-1" /> Add Milestone
        </button>
      </div>
    </div>
  );
};

export default TimeBoundComponent;
