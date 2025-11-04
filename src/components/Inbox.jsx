// export default function Inbox({ emails, onSelectEmail, selectedEmailId }) {
//   return (
//     <div className="inbox">
//       <input type="text" placeholder="Search emails..." />

//       <ul>
//         {emails.map((email) => (
//           <li 
//             key={email.id} 
//             // FIX: Use the 'onSelectEmail' prop passed down from the Dashboard
//             onClick={() => onSelectEmail(email)}
//             // Add a class for styling the selected item
//             className={selectedEmailId === email.id ? 'selected' : ''}
//           >
//             <h4>{email.from_email}</h4>
//             <p>{email.subject}</p>

//             <div className="tags">
//               {/* Note: The 'priority' field is not in your API, 'urgency' is.
//                   This is a potential next bug, but we will fix the crash first. */}
//               {email.urgency && (
//                 <span className={`tag ${email.urgency.toLowerCase()}`}>
//                   {email.urgency}
//                 </span>
//               )}
//             </div>

//             <small>{new Date(email.processed_at).toLocaleString()}</small>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


//lukas code 


// import "../components/Inbox.css";
// export default function Inbox({ emails, onSelectEmail, selectedEmailId }) {
//   return (
//     <div className="inbox-list-container">
//       <div className="inbox-controls">
//         <select className="inbox-filter">
//           <option value="">All Status</option>
//           <option value="pending">Pending</option>
//           <option value="resolved">Resolved</option>
//         </select>
//       </div>

//       <div className="inbox-items">
//         {emails.map((email) => {
//           const isActive = selectedEmailId === email.id;

//           return (
//             <div
//               key={email.id}
//               onClick={() => onSelectEmail(email)}
//               className={`inbox-item ${isActive ? "active" : ""}`}
//             >
//               <div className="inbox-item-header">
//                 <span className="inbox-sender">{email.from_email}</span>
//                 <span className="inbox-date">
//                   {new Date(email.processed_at).toLocaleDateString()}
//                 </span>
//               </div>

//               <div className="inbox-subject">{email.subject}</div>

//               {email.preview && (
//                 <div className="inbox-preview">{email.preview}</div>
//               )}

//               {email.urgency && (
//                 <div className="inbox-tags">
//                   <span className={`tag tag-${email.urgency.toLowerCase()}`}>
//                     {email.urgency}
//                   </span>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
import "../components/Inbox.css";

export default function Inbox({ emails, onSelectEmail, selectedEmailId }) {
  return (
    <div className="inbox-list-container">
      <div className="inbox-controls">
        <select className="inbox-filter">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="inbox-items">
        {emails.map((email) => {
          const isActive = selectedEmailId === email.id;

          return (
            <div
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={`inbox-item ${isActive ? "active" : ""}`}
            >
             
              <div className="inbox-item-header">
                <span className="inbox-sender">{email.from_email}</span>
                <span className="inbox-date">
                  {new Date(email.processed_at).toLocaleDateString()}
                </span>
              </div>

          
              <div className="inbox-subject">{email.subject}</div>

           
              {email.preview && (
                <div className="inbox-preview">{email.preview}</div>
              )}

              {email.urgency && (
                <div className="inbox-tags">
                  <span className={`urgency-pill urgency-${email.urgency.toLowerCase()}`}>
                    {email.urgency}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
