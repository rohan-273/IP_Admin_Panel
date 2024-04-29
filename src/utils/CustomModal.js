import React, { useEffect } from "react";
import PropTypes from "prop-types";

const CustomModal = ({ isOpen, onRequestClose, message }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".modal-content")) {
        onRequestClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onRequestClose]);

  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "400px",
      width: "80%",
      position: "relative",
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      right: "10px",
      cursor: "pointer",
    },
  };

  return (
    <>
      {isOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content} className="modal-content">
            <span style={modalStyles.closeButton} onClick={onRequestClose}>
              &times;
            </span>
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default CustomModal;
