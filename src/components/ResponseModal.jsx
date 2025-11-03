
import { useState } from "react";

export default function ResponseModal({ type, defaultText = "", onClose, onSend }) {
  const [body, setBody] = useState(defaultText || "");

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{type === "reply" ? "AI Generated Response" : "Write Reply"}</h3>

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Type your reply..."
        />

        <div className="modal-buttons">
          {/* Only show send button when we have text */}
          <button
            onClick={() => onSend(body)}
            disabled={!body.trim()}
            className="send-btn"
          >
            Send Reply ✅
          </button>

          <button onClick={onClose} className="cancel-btn">
            Cancel ❌
          </button>
        </div>
      </div>
    </div>
  );
}
