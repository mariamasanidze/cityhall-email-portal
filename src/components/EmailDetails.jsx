
import "../components/EmailDetails.css";
import { useState } from "react";
import ResponseModal from "./ResponseModal";
import { generateReply, sendReply } from "../api";
import SuccessPopup from "./SuccessPopup";
import SendBackModal from "./SendBackModal";

export default function EmailDetails({ email }) {
  const [modalType, setModalType] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [showSendBack, setShowSendBack] = useState(false);

  if (!email) {
    return <div className="no-email-selected">Select an email to view details</div>;
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
      setPopupMessage("Reply Sent ");
      setShowPopup(true);
      setModalType(null);
    } catch (err) {
      console.error("Send reply error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }
  async function handleSentTo(finalText) {
    setLoading(true);
    try {
      console.log("Sent to Mayor with message:", finalText);
      setPopupMessage("გაგზავნილია მერთან ");
      setShowPopup(true);
      setModalType(null);
    } catch (err) {
      console.error("SentTo error:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSendBackSubmit(data) {
    console.log("Send Back Data:", data);
    setShowSendBack(false);
    setPopupMessage("Email Sent Back ");
    setShowPopup(true);
  }

  function handleArchive() {
    setPopupMessage("Email Archived 📦");
    setShowPopup(true);
  }

  return (
    <div className="email-details-container">
      <div className="email-header">
        <h2 className="email-title">{email.subject}</h2>
      </div>

      <div className="email-meta-box">
        <p><strong>From:</strong> {email.from_email}</p>
        <p><strong>To:</strong> cityhall@city.gov</p>
        <p><strong>Date:</strong> {email.date_str}</p>
      </div>

      <div className="email-body-box">
        <p>{email.text_body}</p>
      </div>

      <h3 className="section-title">Quick Actions</h3>

      <div className="quick-actions-grid">
        <button className="qa-btn success" onClick={() => handleGenerateReply("Yes")} disabled={loading}>
          Accept
        </button>

        <button className="qa-btn danger" onClick={() => handleGenerateReply("No")} disabled={loading}>
          Reject
        </button>

        <button className="qa-btn info" onClick={() => {setReplyText(""); setModalType("custom"); }} disabled={loading}>
         Custom Reply
        </button>

        <button className="qa-btn neutral" onClick={() => setShowSendBack(true)} disabled={loading}>
          Send Back
        </button>

        <button className="qa-btn neutral" onClick={handleArchive} disabled={loading}>
          Archive Email
        </button>
      </div>

      {modalType && (
        <ResponseModal
          type={modalType}
          defaultText={replyText}
          onClose={() => setModalType(null)}
          onSend={handleSendReply}
          onSentTo={handleSentTo} 
        />
      )}

      {showSendBack && (
        <SendBackModal
          onClose={() => setShowSendBack(false)}
          onSendBack={handleSendBackSubmit}
        />
      )}

      {showPopup && (
        <SuccessPopup
          message={popupMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
