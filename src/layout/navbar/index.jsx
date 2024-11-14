import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navbarStyle = {
    backgroundColor: "blue",
    padding: "10px",
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
  };

  const listItemStyle = {
    color: "white !important",
    cursor: "pointer",
  };
  return (
    <div>
      <ul style={navbarStyle}>
        <li style={listItemStyle}>
          <Link to="/" style={listItemStyle}>
            Home
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="/about" style={listItemStyle}>
            About
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
