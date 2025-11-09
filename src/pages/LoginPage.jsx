

// import Logo from "../assets/logo.svg";
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
//       const data = await login(email, password);
//       const storedAccess = localStorage.getItem("access");

//       if (!storedAccess) throw new Error("Access token not saved!");

//       window.location.href = "/dashboard";
//     } catch (err) {
//       if (err.response?.status === 401) setError("Invalid email or password");
//       else if (err.code === "ERR_NETWORK") setError("Backend not running (http://127.0.0.1:8000)");
//       else setError(err.response?.data?.detail || "Login failed");
//     }
//     setLoading(false);
//   }

//   return (
//     <div className="login-bg">
//       <div className="login-card ui-card">
        
     
//         <div className="login-logo">
//           <img src={Logo} alt="City Hall Logo" />
//         </div>

//         <h2 className="ui-title">City Hall Email Portal</h2>
//         <p className="ui-subtitle">Sign in to access your department's emails</p>

        
//         {error && <div className="ui-error">{error}</div>}

        
//         <form onSubmit={handleLogin} className="ui-form">
          
         
//           <div className="ui-input-wrapper">
//             <span className="ui-icon">📧</span>
//             <input
//               type="email"
//               placeholder="admin@cityhall.gov"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               disabled={loading}
//               className="ui-input"
//             />
//           </div>

        
//           <div className="ui-input-wrapper">
//             <span className="ui-icon">🔒</span>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               disabled={loading}
//               className="ui-input"
//             />
//           </div>

//           <button className="ui-button" type="submit" disabled={loading}>
//             {loading ? "Signing in..." : "Sign in"}
//           </button>
//         </form>

        
//         {/* <div className="ui-demo-box">
//           <strong>Demo Credentials:</strong>
//           <ul>
//             <li>admin@cityhall.gov</li>
//             <li>finance@cityhall.gov</li>
//             <li>social@cityhall.gov</li>
//             <li>audit@cityhall.gov</li>
//             <li>culture@cityhall.gov</li>
//             <li>infrastructure@cityhall.gov</li>
//           </ul>
//           Password: <b>password123</b>
//         </div> */}

//       </div>
//     </div>
//   );
// }



// for saving login info


import Logo from "../assets/logo.svg";
import { useState, useEffect } from "react";
import { login } from "../apiAuth";
import "../pages/LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true); 

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");

    if (savedEmail) setEmail(savedEmail);
    if (savedPassword) setPassword(savedPassword);
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);
      const storedAccess = localStorage.getItem("access");

      if (!storedAccess) throw new Error("Access token not saved!");

     
      if (rememberMe) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      window.location.href = "/dashboard";
    } catch (err) {
      if (err.response?.status === 401) setError("Invalid email or password");
      else if (err.code === "ERR_NETWORK")
        setError("Backend not running (http://127.0.0.1:8000)");
      else setError(err.response?.data?.detail || "Login failed");
    }

    setLoading(false);
  }

  return (
    <div className="login-bg">
      <div className="login-card ui-card">
        <div className="login-logo">
          <img src={Logo} alt="City Hall Logo" />
        </div>

        <h2 className="ui-title">City Hall Email Portal</h2>
        <p className="ui-subtitle">Sign in to access your department's emails</p>

        {error && <div className="ui-error">{error}</div>}

        <form onSubmit={handleLogin} className="ui-form">
          <div className="ui-input-wrapper">
            <span className="ui-icon">📧</span>
            <input
              type="email"
              placeholder="admin@cityhall.gov"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="ui-input"
            />
          </div>

          <div className="ui-input-wrapper">
            <span className="ui-icon">🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="ui-input"
            />
          </div>

          
          <label className="remember-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me 
          </label>

          <button className="ui-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
