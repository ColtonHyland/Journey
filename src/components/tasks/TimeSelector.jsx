import React, { useState, useEffect, useRef } from 'react';

const TimeSelector = ({ id, onChange, label }) => {
  const [selectedTime, setSelectedTime] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const dropdownRef = useRef(null); 

  useEffect(() => {
    generateTimeOptions();
    const currentTime = new Date();
    const minutes = currentTime.getMinutes();
    const roundedMinutes = Math.ceil(minutes / 15) * 15;
    currentTime.setMinutes(roundedMinutes % 60);
    currentTime.setHours(currentTime.getHours() + (roundedMinutes >= 60 ? 1 : 0), 0, 0, 0);
    if (id === 'end-time') {
      currentTime.setMinutes(currentTime.getMinutes() + 15);
    }
    setSelectedTime(currentTime.toISOString());
  }, [id]);

  useEffect(() => {
    if (isOpen && selectedTime) {
      scrollToSelectedTime();
    }
  }, [isOpen, selectedTime]);

  const generateTimeOptions = () => {
    const times = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < 4 * 24; i++) {
      times.push(new Date(currentDate).toISOString());
      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }
    setOptions(times);
  };

  const scrollToSelectedTime = () => {
    const index = options.findIndex(option => option === selectedTime);
    const node = dropdownRef.current;
    if (node && index >= 0) {
      const element = node.children[index];
      if (element) element.scrollIntoView({ block: 'center' });
    }
  };

  const handleSelect = (isoTime) => {
    const time = new Date(isoTime);
    const localDateTimeString = new Date(time.getTime() - (time.getTimezoneOffset() * 60000)).toISOString().replace('Z', '');
  
    setSelectedTime(localDateTimeString);
    setIsOpen(false);
    if (onChange) {
      onChange(localDateTimeString);
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
          <div ref={dropdownRef} className="absolute w-full border border-gray-300 rounded-md shadow-sm bg-white max-h-32 overflow-auto">
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
