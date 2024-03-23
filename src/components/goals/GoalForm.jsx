import React from 'react';

const GoalForm = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Add a Goal</h1>
      <form>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter a title"
            className="input input-bordered w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            className="textarea textarea-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Goal
        </button>
      </form>
    </div>
  );
}

export default GoalForm;