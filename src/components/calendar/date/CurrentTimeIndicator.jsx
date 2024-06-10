"use client";
import React, { useEffect, useState } from "react";

const CurrentTimeIndicator = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const updateTimePosition = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const position = (hours * 60 + minutes) / (24 * 60) * 100;
      setCurrentPosition(position);
    };

    updateTimePosition();
    const intervalId = setInterval(updateTimePosition, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="absolute left-0 flex items-center"
      style={{
        top: `${currentPosition}%`,
        transform: "translateY(-50%)",
      }}
    >
      <div
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      ></div>
      <div
        style={{
          flexGrow: 1,
          height: "3px",
          backgroundColor: "red",
          marginLeft: "2px",
        }}
      ></div>
    </div>
  );
};

export default CurrentTimeIndicator;
