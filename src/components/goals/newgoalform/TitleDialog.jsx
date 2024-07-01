'use client';
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const TitleDialog = ({ onCancel, onContinue }) => {
  const [title, setTitle] = useState("");

  const handleContinue = () => {
    if (title.trim() !== "") {
      onContinue(title);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative">
        <h2 className="text-lg font-semibold mb-4">Enter Goal Title</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded-md"
          placeholder="Title"
        />
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={onCancel}
            className="py-2 px-4 border-2 border-black shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleContinue}
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-900"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleDialog;
