import React from "react";
import "./index.css";
import { logout } from "../Service/services";

const Header = () => {
  const hanldeLogout = () => {
    logout();
    window.location.href = "/";
  };
  return (
    <header className="header">
      <div className="header-logo">
        <h1 className="logo-text">Logo</h1>
      </div>
      <nav className="header-nav">
        <a href="/home" className="nav-link">
          Home
        </a>
      </nav>
      <button onClick={hanldeLogout} className="header-button">
        Logout
      </button>
    </header>
  );
};

export default Header;
