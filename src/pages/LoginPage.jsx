// import { useState } from "react";
// import { login } from "../apiAuth";
// import "../pages/LoginPage.css";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleLogin(e) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       console.log("🔐 Attempting login with:", email);
      
//       const data = await login(email, password);
      
//       console.log("✅ Login successful!");
//       console.log("📦 Response data:", data);
    
//       const storedAccess = localStorage.getItem("access");
//       const storedRefresh = localStorage.getItem("refresh");
      
//       console.log("💾 Access token stored:", storedAccess?.substring(0, 20) + "...");
//       console.log("💾 Refresh token stored:", storedRefresh?.substring(0, 20) + "...");
      
//       if (!storedAccess) {
//         throw new Error("Access token was not saved to localStorage!");
//       }
      
    
//       window.location.href = "/dashboard";
      
//     } catch (err) {
//       console.error("❌ Login failed:", err);
//       console.error("📋 Error details:", {
//         message: err.message,
//         response: err.response?.data,
//         status: err.response?.status,
//       });
      
//       if (err.response?.status === 401) {
//         setError("Invalid email or password");
//       } else if (err.code === "ERR_NETWORK") {
//         setError("Cannot connect to backend. Make sure it's running on http://127.0.0.1:8000");
//       } else {
//         setError(err.response?.data?.detail || err.message || "Login failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <div className="logo">🏛️</div>
//         <h1>City Hall Email Portal</h1>
//         <p>Sign in to access your department's emails</p>

//         {error && (
//           <div style={{ 
//             padding: "10px", 
//             marginBottom: "15px",
//             backgroundColor: "#fee", 
//             color: "#c00",
//             borderRadius: "4px",
//             border: "1px solid #fcc"
//           }}>
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin}>
//           <label>Email</label>
//           <input
//             type="email"
//             placeholder="your.email@cityhall.gov"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             disabled={loading}
//           />

//           <label>Password</label>
//           <input
//             type="password"
//             placeholder="Enter your password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             disabled={loading}
//           />

//           <button type="submit" disabled={loading}>
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>

//         <div className="demo-creds">
//           <p><strong>Demo Credentials:</strong></p>
//           <ul>
//             <li>admin@cityhall.gov</li>
//             <li>finance@cityhall.gov</li>
//             <li>social@cityhall.gov</li>
//             <li>audit@cityhall.gov</li>
//             <li>culture@cityhall.gov</li>
//             <li>infrastructure@cityhall.gov</li>
//           </ul>
//           <p>Password: <code>password123</code></p>
//         </div>
//       </div>
//     </div>
//   );
// }
import Logo from "../assets/logo.svg";
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
      const storedAccess = localStorage.getItem("access");

      if (!storedAccess) throw new Error("Access token not saved!");

      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ Login failed:", err);
      if (err.response?.status === 401) setError("Invalid email or password");
      else if (err.code === "ERR_NETWORK")
        setError("Backend not running (http://127.0.0.1:8000)");
      else setError(err.response?.data?.detail || "Login failed");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        {/* <div className="login-icon">📩</div> */}
        <div className="login-logo">
  <img src={Logo} alt="City Hall Logo" />
</div>


        <h2 className="title">City Hall Email Portal</h2>
        <p className="subtitle">Sign in to access your department's emails</p>

        {error && <div className="error-box">{error}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <span>✉️</span>
            <input
              type="email"
              placeholder="your.email@cityhall.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <span>🔒</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button className="btn-login" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="demo-box">
          <strong>Demo Credentials:</strong>
          <ul>
            <li>admin@cityhall.gov</li>
            <li>finance@cityhall.gov</li>
            <li>social@cityhall.gov</li>
            <li>audit@cityhall.gov</li>
            <li>culture@cityhall.gov</li>
            <li>infrastructure@cityhall.gov</li>
          </ul>
          Password: <b>password123</b>
        </div>
      </div>
    </div>
  );
}
