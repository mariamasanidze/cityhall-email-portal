

// import React from "react";
// import "../components/Header.css";
// import Logo from "../assets/logo.svg"; 

// export default function Header() {
//   const username = localStorage.getItem("user") || "Administrative Service";

//   return (
//     <div className="header">
    
//       <div className="header-left">
//         <img src={Logo} className="header-logo" alt="logo" />
//         <div>
//           <h2 className="portal-title">City Hall Email Portal</h2>
//           <span className="user-role">{username}</span>
//         </div>
//       </div>

//       <div className="header-right">
//   <div className="simple-buttons">
//     <button className="simple-btn">გასვლა</button>
//   </div>
// </div>

//     </div>
//   );
// }


import React from "react";
import "../components/Header.css";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const username = localStorage.getItem("user") || "Administrative Service";
  const navigate = useNavigate();

  
  function handleLogout() {
    navigate("/"); 
  }

  return (
    <div className="header">
      <div className="header-left">
        <img src={Logo} className="header-logo" alt="logo" />
        <div>
          <h2 className="portal-title">City Hall Email Portal</h2>
          <span className="user-role">{username}</span>
        </div>
      </div>

      <div className="header-right">
        <div className="simple-buttons">
          <button className="simple-btn" onClick={handleLogout}>
            გასვლა
          </button>
        </div>
      </div>
    </div>
  );
}
