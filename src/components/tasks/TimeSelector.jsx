import React, { useState, useEffect } from 'react';

const TimeSelector = ({ id, onChange, label }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    currentTime.setMinutes(roundedMinutes % 60);
    currentTime.setHours(currentTime.getHours() + (roundedMinutes >= 60 ? 1 : 0));
    
    const formattedTime = currentTime.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    
    setTime(formattedTime);
  }, []);

  const generateTimeOptions = () => {
    const times = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

    for (let i = 0; i < 4 * 24; i++) {
      const formattedTime = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      times.push(formattedTime);
      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }
    return times;
  };

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        value={time}
        onChange={(e) => {
          setTime(e.target.value);
          if (onChange) {
            onChange(e.target.value);
          }
        }}
        className="block w-full p-2 border border-gray-300 rounded-md shadow-sm overflow-auto text-base leading-tight max-h-60"
        required
      >
        {generateTimeOptions().map(timeOption => (
          <option key={timeOption} value={timeOption}>{timeOption}</option>
        ))}
      </select>
    </div>
  );
};

export default TimeSelector;
