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


export default function Inbox({ emails, onSelectEmail, selectedEmailId }) {
  return (
    <div className="inbox-list">
      <ul className="inbox-ul">
        {emails.map((email) => {
          const isActive = selectedEmailId === email.id;
          return (
            <li
              key={email.id}
              onClick={() => onSelectEmail(email)}
              className={`email-item ${isActive ? "active" : ""}`}
            >
              <div className="email-top-row">
                <h4 className="email-from">{email.from_email}</h4>
                <small className="email-date">
                  {new Date(email.processed_at).toLocaleString()}
                </small>
              </div>

              <p className="email-subject">{email.subject}</p>

              {email.urgency && (
                <div className="tags">
                  <span className={`tag ${email.urgency.toLowerCase()}`}>
                    {email.urgency}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
