
// import { useState } from "react";

// export default function ResponseModal({ type, defaultText = "", onClose, onSend }) {
//   const [body, setBody] = useState(defaultText || "");

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h3>{type === "reply" ? "AI Generated Response" : "Write Reply"}</h3>

//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Type your reply..."
//         />

//         <div className="modal-buttons">
//           <button
//             onClick={() => onSend(body)}
//             disabled={!body.trim()}
//             className="send-btn"
//           >
//             Send Reply ✅
//           </button>

//           <button onClick={onClose} className="cancel-btn">
//             Cancel ❌
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



// import { useState } from "react";

// export default function ResponseModal({ type, defaultText = "", onClose, onSend, onSentTo }) {
//   const [body, setBody] = useState(defaultText || "");

//   return (
//     <div className="modal-overlay">
//       <div className="modal-box">
//         <h3>{type === "reply" ? "AI Generated Response" : "Write Reply"}</h3>

//         <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           placeholder="Type your reply..."
//         />

//         <div className="modal-buttons">
//           <button
//             onClick={() => onSend(body)}
//             disabled={!body.trim()}
//             className="send-btn"
//           >
//             პასუხის გაგზავნა 
//           </button>

//           <button
//             onClick={() => onSentTo(body)}
//             disabled={!body.trim()}
//             className="sent-to-btn"
//           >
//             მერთან გაგზავნა
//           </button>

//           <button onClick={onClose} className="cancel-btn">
//             გაუქმება
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import meriaImage from "../assets/meria.png"; 

export default function ResponseModal({ type, defaultText = "", onClose, onSend, onSentTo }) {
  const [body, setBody] = useState(defaultText || "");

  const handleViewPDF = () => {
    window.open(meriaImage, "_blank");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{type === "reply" ? "AI Generated Response" : "Write Reply"}</h3>

        {/* Wrap the textarea in a container so we can position the link inside */}
        <div className="textarea-container">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Type your reply..."
          />

          <span className="view-pdf-link" onClick={handleViewPDF}>
            იხილეთ პდფ 
          </span>
        </div>

        <div className="modal-buttons">
          <button
            onClick={() => onSend(body)}
            disabled={!body.trim()}
            className="send-btn"
          >
            პასუხის გაგზავნა 
          </button>

          <button
            onClick={() => onSentTo(body)}
            disabled={!body.trim()}
            className="sent-to-btn"
          >
           მერთან გაგზავნა 
          </button>

          <button onClick={onClose} className="cancel-btn">
            გაუქმება 
          </button>
        </div>
      </div>
    </div>
  );
}
