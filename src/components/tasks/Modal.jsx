import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ onClose, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === "modal-backdrop") {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.keyCode === 27) onClose();  // Listen for ESC key to close the modal
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [onClose]);

  return (
    <div id="modal-backdrop" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4" onClick={handleOutsideClick}>
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
