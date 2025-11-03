// import { useState } from "react";
// import ResponseModal from "./ResponseModal";

// export default function EmailDetails({ email }) {
//   const [modalType, setModalType] = useState(null);

//   if (!email) return <div className="placeholder">Select an email to view details</div>;

//   return (
//     <div className="email-details">
//       <h2>{email.subject}</h2>
//       <p><strong>From:</strong> {email.sender}</p>
//       <p>{email.body}</p>

//       <div className="actions">
//         {["Accept", "Reject", "Request Info", "Forward", "Custom Reply", "Acknowledge"].map((type) => (
//           <button key={type} onClick={() => setModalType(type)}>
//             {type}
//           </button>
//         ))}
//       </div>

//       {modalType && <ResponseModal type={modalType} onClose={() => setModalType(null)} />}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import ResponseModal from "./ResponseModal";

export default function EmailDetails({ email }) {
  const [modalType, setModalType] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) return <div className="placeholder">Select an email to view details</div>;

  const token = localStorage.getItem("access");

  // --- Generate AI Reply ---
  async function generateReply(choice) {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/emails/${email.id}/generate_reply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ choice }),
      });

      const data = await res.json();
      if (res.ok) {
        setReplyText(data.gpt_generated_reply);
        setModalType("reply");
      } else {
        alert(data.error || "Error generating reply");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  }

  // --- Send Reply ---
  async function sendReply(finalText) {
    setLoading(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/emails/${email.id}/send_reply/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply_content: finalText }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Reply Sent ✅");
        setModalType(null);
      } else {
        alert(data.error || "Error sending reply");
      }
    } catch {
      alert("Server error");
    }
    setLoading(false);
  }

  return (
    <div className="email-details">
      <h2>{email.subject}</h2>
      <p><strong>From:</strong> {email.from_email}</p>
      <p><strong>Date:</strong> {email.date_str}</p>
      <hr />
      <p>{email.text_body}</p>

      <div className="actions">
        <button onClick={() => generateReply("accept")} disabled={loading}>Generate Reply</button>
        <button onClick={() => setModalType("custom")} disabled={loading}>Write Custom Reply</button>
      </div>

      {/* Modal for editing and sending */}
      {modalType && (
        <ResponseModal
          type={modalType}
          defaultText={replyText}
          onClose={() => setModalType(null)}
          onSend={sendReply}
        />
      )}
    </div>
  );
}
