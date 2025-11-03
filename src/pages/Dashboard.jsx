import { useState, useEffect } from "react";
import Header from "../components/Header";
import Inbox from "../components/inbox";
import EmailDetails from "../components/EmailDetails";
import api from "../api";
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
        
   
        const token = localStorage.getItem("access");
        console.log("🔑 Token exists:", !!token);
        console.log("📡 Fetching from:", api.defaults.baseURL + "/emails/");
        
        const res = await api.get("/emails/");
        
        console.log("✅ Emails loaded:", res.data);
        setEmails(res.data);
        
      } catch (err) {
        console.error("❌ Email Fetch Error:", err);
        console.error("📋 Error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        
        if (err.response?.status === 401) {
          setError("Session expired. Please log in again.");
          setTimeout(() => {
            localStorage.clear();
            window.location.href = "/";
          }, 2000);
        } else if (err.code === "ERR_NETWORK") {
          setError("Cannot connect to backend. Make sure it's running on http://127.0.0.1:8000");
        } else {
          setError(`Error loading emails: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    }

    loadEmails();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard">
        {loading && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>Loading emails...</p>
          </div>
        )}
        
        {error && (
          <div style={{ padding: "20px", color: "red", backgroundColor: "#fee" }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        
        {!loading && !error && (
          <>
            <Inbox emails={emails} onSelect={setSelectedEmail} />
            <EmailDetails email={selectedEmail} />
          </>
        )}
        
        {!loading && !error && emails.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <p>No emails found. The backend is connected but returned no data.</p>
          </div>
        )}
      </div>
    </>
  );
}