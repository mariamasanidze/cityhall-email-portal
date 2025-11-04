

//lukas code

import { useState } from "react";
import ResponseModal from "./ResponseModal";
import { generateReply, sendReply } from "../api";

export default function EmailDetails({ email }) {
  const [modalType, setModalType] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  if (!email) {
    return (
      <div className="dash-center-msg">
        Select an email to view details
      </div>
    );
  }

  async function handleGenerateReply(choice) {
    setLoading(true);
    try {
      const data = await generateReply(email.id, choice);
      setReplyText(data.gpt_generated_reply);
      setModalType("reply");
    } catch (err) {
      console.error("Generate reply error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSendReply(finalText) {
    setLoading(true);
    try {
      await sendReply(email.id, finalText);
      alert("Reply Sent ✅");
      setModalType(null);
    } catch (err) {
      console.error("Send reply error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="email-details">
      <h2 className="email-title">{email.subject}</h2>
      <div className="email-meta">
        <p><strong>From:</strong> {email.from_email}</p>
        <p><strong>Date:</strong> {email.date_str}</p>
      </div>
      <hr />
      <div className="email-body">{email.text_body}</div>

      <div className="actions">
        <button onClick={() => handleGenerateReply("Yes")} disabled={loading}>
          Generate 'Yes' Reply
        </button>
        <button onClick={() => handleGenerateReply("No")} disabled={loading}>
          Generate 'No' Reply
        </button>
        <button onClick={() => setModalType("custom")} disabled={loading}>
          Write Custom Reply
        </button>
      </div>

      {modalType && (
        <ResponseModal
          type={modalType}
          defaultText={replyText}
          onClose={() => setModalType(null)}
          onSend={handleSendReply}
        />
      )}
    </div>
  );
}
