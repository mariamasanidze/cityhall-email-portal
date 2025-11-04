

// //lukas code

// import { useState } from "react";
// import ResponseModal from "./ResponseModal";
// import { generateReply, sendReply } from "../api";

// export default function EmailDetails({ email }) {
//   const [modalType, setModalType] = useState(null);
//   const [replyText, setReplyText] = useState("");
//   const [loading, setLoading] = useState(false);

//   if (!email) {
//     return (
//       <div className="dash-center-msg">
//         Select an email to view details
//       </div>
//     );
//   }

//   async function handleGenerateReply(choice) {
//     setLoading(true);
//     try {
//       const data = await generateReply(email.id, choice);
//       setReplyText(data.gpt_generated_reply);
//       setModalType("reply");
//     } catch (err) {
//       console.error("Generate reply error:", err);
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleSendReply(finalText) {
//     setLoading(true);
//     try {
//       await sendReply(email.id, finalText);
//       alert("Reply Sent ✅");
//       setModalType(null);
//     } catch (err) {
//       console.error("Send reply error:", err);
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="email-details">
//       <h2 className="email-title">{email.subject}</h2>
//       <div className="email-meta">
//         <p><strong>From:</strong> {email.from_email}</p>
//         <p><strong>Date:</strong> {email.date_str}</p>
//       </div>
//       <hr />
//       <div className="email-body">{email.text_body}</div>

//       <div className="actions">
//         <button onClick={() => handleGenerateReply("Yes")} disabled={loading}>
//           Generate 'Yes' Reply
//         </button>
//         <button onClick={() => handleGenerateReply("No")} disabled={loading}>
//           Generate 'No' Reply
//         </button>
//         <button onClick={() => setModalType("custom")} disabled={loading}>
//           Write Custom Reply
//         </button>
//       </div>

//       {modalType && (
//         <ResponseModal
//           type={modalType}
//           defaultText={replyText}
//           onClose={() => setModalType(null)}
//           onSend={handleSendReply}
//         />
//       )}
//     </div>
//   );
// }


import "../components/EmailDetails.css";
import { useState } from "react";
import ResponseModal from "./ResponseModal";
import { generateReply, sendReply } from "../api";

export default function EmailDetails({ email }) {
  const [modalType, setModalType] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

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

        <button className="qa-btn info" onClick={() => setModalType("custom")} disabled={loading}>
          Custom Reply
        </button>

        <button className="qa-btn neutral" disabled>
          Forward
        </button>

        <button className="qa-btn neutral" disabled>
          Acknowledge
        </button>

        <button className="qa-btn neutral" disabled>
          Request Info
        </button>
      </div>

      <button className="archive-btn" disabled>
        Archive Email
      </button>

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
