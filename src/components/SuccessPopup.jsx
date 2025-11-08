
import React from "react";
import "./SuccessPopup.css";

export default function SuccessPopup({ message, onClose }) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <div className="tick-icon">✅</div>
        <h3>{message}</h3>
      </div>
    </div>
  );
}
