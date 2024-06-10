import React from "react";
import PropTypes from "prop-types";

const Tooltip = ({ message, visible }) => {
  if (!visible) return null;

  return (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
      <div className="relative bg-black text-white text-sm p-2 rounded shadow-lg mt-8">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-black"></div>
        {message}
      </div>
    </div>
  );
};

Tooltip.propTypes = {
  message: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  customStyle: PropTypes.object,
};

export default Tooltip;
