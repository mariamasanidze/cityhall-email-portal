// import { useState, useEffect } from "react";
// import Header from "../components/Header";
// import Inbox from "../components/Inbox";
// import EmailDetails from "../components/EmailDetails";
// // FIX: Use named imports to get the specific functions we need.
// import { getEmails, getEmailDetails } from "../api";
// import "../App.css";

// export default function Dashboard() {
//   const [emails, setEmails] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch the initial list of emails
//   useEffect(() => {
//     async function loadEmails() {
//       setLoading(true);
//       setError(null);
//       try {
//         const data = await getEmails();
//         setEmails(data);
//       } catch (err) {
//         console.error("❌ Email List Fetch Error:", err);
//         setError(`Failed to load emails: ${err.message}`);
//       }
//       setLoading(false);
//     }
//     loadEmails();
//   }, []);

//   // Fetch the full email details when an email is selected from the list
//   const handleSelectEmail = async (emailFromList) => {
//     // Avoid re-fetching if the same email is clicked again
//     if (selectedEmail && selectedEmail.id === emailFromList.id) return;

//     // Show a loading state specifically for the details pane
//     setSelectedEmail(null); // Clear the old selection immediately
//     setLoading(true);
//     setError(null);

//     try {
//       const detailedEmail = await getEmailDetails(emailFromList.id);
//       setSelectedEmail(detailedEmail);
//     } catch (err) {
//       console.error(`❌ Email Detail Fetch Error (ID: ${emailFromList.id}):`, err);
//       setError(`Failed to load email details: ${err.message}`);
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="dashboard-container">
//       <Header />
//       <main className="dashboard-main">
//         <Inbox 
//           emails={emails} 
//           onSelectEmail={handleSelectEmail} 
//           selectedEmailId={selectedEmail?.id} 
//         />
//         <div className="details-pane">
//           {loading && <div className="placeholder">Loading...</div>}
//           {error && <div className="error-banner">{error}</div>}
//           {!loading && <EmailDetails email={selectedEmail} />}
//         </div>
//       </main>
//     </div>
//   );
// }


// lukas code ends here





import { useState, useEffect } from "react";
import Header from "../components/Header";
import Inbox from "../components/Inbox";
import EmailDetails from "../components/EmailDetails";
import { getEmails, getEmailDetails } from "../api";
import "../pages/Dashboard.css";
import "../App.css";

export default function Dashboard() {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEmails() {
      try {
        setLoading(true);
        setError(null);
        const data = await getEmails();
        setEmails(data);
      } catch (err) {
        console.error("❌ Email Fetch Error:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Redirecting to login...");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/";
          }, 1500);
        } else if (err.code === "ERR_NETWORK") {
          setError("Backend unavailable. Start server at http://127.0.0.1:8000");
        } else {
          setError(`Error loading emails: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }
    loadEmails();
  }, []);

  async function handleSelectEmail(email) {
    if (selectedEmail?.id === email.id) return;
    setSelectedEmail(null);
    setLoading(true);
    try {
      const detailed = await getEmailDetails(email.id);
      setSelectedEmail(detailed);
    } catch (err) {
      console.error("❌ Email Detail Fetch Error:", err);
      setError(`Failed to load email details: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="dash-root">
      <Header />

      <div className="dash-layout">
        
        <aside className="dash-inbox-panel">
          <div className="dash-search-box">
            <input type="text" placeholder="Search emails..." />
          </div>

          <div className="email-list-scroll">
            <Inbox
              emails={emails}
              onSelectEmail={handleSelectEmail}
              selectedEmailId={selectedEmail?.id}
            />
          </div>
        </aside>

        
        <section className="dash-content-panel">
          {loading && <div className="dash-center-msg">Loading...</div>}

          {!loading && error && (
            <div className="dash-error-box">{error}</div>
          )}

          {!loading && !error && (
            emails.length === 0 ? (
              <div className="dash-center-msg">
                <div>No emails found.</div>
                <small>The backend is connected but returned no data.</small>
              </div>
            ) : (
              <div className="email-details-container">
                <EmailDetails email={selectedEmail} />
              </div>
            )
          )}
        </section>
      </div>
    </div>
  );
}
