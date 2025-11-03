import { useState } from "react";
import { login } from "../apiAuth";
import "../pages/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔐 Attempting login with:", email);
      
      const data = await login(email, password);
      
      console.log("✅ Login successful!");
      console.log("📦 Response data:", data);
      
      // Verify tokens were stored
      const storedAccess = localStorage.getItem("access");
      const storedRefresh = localStorage.getItem("refresh");
      
      console.log("💾 Access token stored:", storedAccess?.substring(0, 20) + "...");
      console.log("💾 Refresh token stored:", storedRefresh?.substring(0, 20) + "...");
      
      if (!storedAccess) {
        throw new Error("Access token was not saved to localStorage!");
      }
      
      // Redirect to dashboard
      window.location.href = "/dashboard";
      
    } catch (err) {
      console.error("❌ Login failed:", err);
      console.error("📋 Error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });
      
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      } else if (err.code === "ERR_NETWORK") {
        setError("Cannot connect to backend. Make sure it's running on http://127.0.0.1:8000");
      } else {
        setError(err.response?.data?.detail || err.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🏛️</div>
        <h1>City Hall Email Portal</h1>
        <p>Sign in to access your department's emails</p>

        {error && (
          <div style={{ 
            padding: "10px", 
            marginBottom: "15px",
            backgroundColor: "#fee", 
            color: "#c00",
            borderRadius: "4px",
            border: "1px solid #fcc"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="your.email@cityhall.gov"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-creds">
          <p><strong>Demo Credentials:</strong></p>
          <ul>
            <li>admin@cityhall.gov</li>
            <li>finance@cityhall.gov</li>
            <li>social@cityhall.gov</li>
            <li>audit@cityhall.gov</li>
            <li>culture@cityhall.gov</li>
            <li>infrastructure@cityhall.gov</li>
          </ul>
          <p>Password: <code>password123</code></p>
        </div>
      </div>
    </div>
  );
}