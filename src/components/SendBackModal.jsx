// src/components/SendBackModal.jsx
import { useState } from "react";
import "./SendBackModal.css";

export default function SendBackModal({ onClose, onSendBack }) {
  
  const fixedRecipient = "cityhall@city.gov";
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) {
      alert("Please write a comment before sending.");
      return;
    }

    onSendBack({ to: fixedRecipient, message });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="sendback-box" onClick={(e) => e.stopPropagation()}>
        <h3>Send Back Email</h3>

        <label>To:</label>
        <input
          type="email"
          value={fixedRecipient}
          readOnly
          className="readonly-input"
        />

        <label>Comment:</label>
        <textarea
          rows="6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message..."
        />

        <div className="sendback-actions">
          <button className="send-btn" onClick={handleSend}>
            Send Back 
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel 
          </button>
        </div>
      </div>
    </div>
  );
}
