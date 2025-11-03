export default function Inbox({ emails, onSelect }) {
  return (
    <div className="inbox">
      <input type="text" placeholder="Search emails..." />

      <ul>
        {emails.map((email) => (
          <li key={email.id} onClick={() => onSelect(email)}>
            <h4>{email.from_email}</h4>
            <p>{email.subject}</p>

            <div className="tags">
              {email.priority && (
                <span className={`tag ${email.priority.toLowerCase()}`}>
                  {email.priority}
                </span>
              )}
              {email.status && (
                <span className={`tag ${email.status.toLowerCase()}`}>
                  {email.status}
                </span>
              )}
            </div>

            <small>{email.processed_at}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

