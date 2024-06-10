"use client";
import React, { useEffect, useState } from "react";

const CurrentTimeIndicator = ({ hourHeight = 80 }) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const updateTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const totalMinutes = hours * 60 + minutes;
      const position = (totalMinutes / (24 * 60)) * (24 * hourHeight);
      setCurrentPosition(position);
    };

    updateTimePosition();
    const intervalId = setInterval(updateTimePosition, 60000);

    return () => clearInterval(intervalId);
  }, [hourHeight]);

  return (
    <div
      className="absolute left-0 flex items-center w-full"
      style={{
        top: `${currentPosition}px`,
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "red",
          marginRight: "-4px",
        }}
      ></div>
      <div
        style={{
          flexGrow: 1,
          height: "2px",
          backgroundColor: "red",
        }}
      ></div>
    </div>
  );
};

export default CurrentTimeIndicator;
