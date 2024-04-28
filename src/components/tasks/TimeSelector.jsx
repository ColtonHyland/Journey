import React, { useState, useEffect } from 'react';

const TimeSelector = ({ id, onChange, label }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    currentTime.setMinutes(roundedMinutes % 60);
    currentTime.setHours(currentTime.getHours() + (roundedMinutes >= 60 ? 1 : 0));
    setSelectedTime(currentTime.toISOString());
    generateTimeOptions();
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Start at midnight
    for (let i = 0; i < 4 * 24; i++) {
      times.push(new Date(currentDate).toISOString());
      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }
    setOptions(times);
  };

  const handleSelect = (isoTime) => {
    setSelectedTime(isoTime);
    setIsOpen(false);
    if (onChange) {
      onChange(isoTime);
    }
  };

  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>}
      <div className="relative">
        <button
        type="button"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-white"
          onClick={() => setIsOpen(!isOpen)}>
          {new Date(selectedTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
        </button>
        {isOpen && (
          <div className="absolute w-full border border-gray-300 rounded-md shadow-sm bg-white max-h-32 overflow-auto">
            {options.map((isoTime, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(isoTime)}
              >
                {new Date(isoTime).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
