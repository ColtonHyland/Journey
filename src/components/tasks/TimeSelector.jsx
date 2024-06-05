import React, { useState, useEffect, useRef, useMemo } from "react";

const TimeSelector = ({ id, onChange, initialTime, className = "" }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // useMemo to avoid recalculating time options unnecessarily
  const options = useMemo(() => {
    const times = [];
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    for (let i = 0; i < 4 * 24; i++) {
      // generates 15-minute increments for 24 hours
      times.push(new Date(currentDate).toISOString());
      currentDate.setMinutes(currentDate.getMinutes() + 15);
    }
    return times;
  }, []); // Dependencies array is empty, so this only runs once on mount

  useEffect(() => {
    if (initialTime) {
      setSelectedTime(initialTime);
    } else {
      const currentTime = new Date();
      const minutes = currentTime.getMinutes();
      const roundedMinutes = Math.ceil(minutes / 15) * 15;
      if (roundedMinutes === 60) {
        currentTime.setMinutes(0);
        currentTime.setHours(currentTime.getHours() + 1);
      } else {
        currentTime.setMinutes(roundedMinutes);
      }

      if (id === "end-time") {
        currentTime.setMinutes(currentTime.getMinutes() + 15);
      }
      currentTime.setSeconds(0, 0);
      setSelectedTime(currentTime.toISOString());
    }
  }, [id, initialTime]);

  useEffect(() => {
    if (isOpen && selectedTime) {
      scrollToSelectedTime();
    }
  }, [isOpen, selectedTime]);

  const scrollToSelectedTime = () => {
    const index = options.findIndex((option) => option === selectedTime);
    const node = dropdownRef.current;
    if (node && index >= 0) {
      const element = node.children[index];
      if (element) element.scrollIntoView({ block: "center" });
    }
  };

  const handleSelect = (isoTime) => {
    const time = new Date(isoTime);
    const localDateTimeString = new Date(
      time.getTime() - time.getTimezoneOffset() * 60000
    )
      .toISOString()
      .replace("Z", "");
    console.log(`Selected Time for ${id}: ${localDateTimeString}`);
    setSelectedTime(localDateTimeString);
    setIsOpen(false);
    if (onChange) {
      onChange(localDateTimeString);
    }
  };

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          className={`block w-full ${className} p-2 border border-gray-300 rounded-md shadow-sm bg-white`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {new Date(selectedTime).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute border w-full border-gray-300 rounded-md shadow-sm bg-white max-h-32 overflow-auto"
          >
            {options.map((isoTime, index) => (
              <div
                key={index}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(isoTime)}
              >
                {new Date(isoTime).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;