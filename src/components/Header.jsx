// export default function Header() {
//   return (
//     <header className="header">
//       <h2>City Hall Email Portal</h2>
//       <div className="header-user">Admin User</div>
//     </header>
//   );
// }


//lukas code

import React from "react";
import "../components/Header.css";
import Logo from "../assets/logo.svg"; 

export default function Header() {
  const username = localStorage.getItem("user") || "Administrative Service";

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
    <button className="simple-btn">ქართ</button>
    <button className="simple-btn">Log Out</button>
  </div>
</div>

    </div>
  );
}