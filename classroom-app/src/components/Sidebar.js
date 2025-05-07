import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // We'll create this CSS file for styling

const Sidebar = () => {
  const [collapsed] = useState(false);

  return (
    <div className={` pt-6 ps-4 sidebar ${collapsed ? "collapsed" : ""}`}  >
      {/* Sidebar Toggle Button */}
      {/* <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        <i className={`bi ${collapsed ? "bi-list" : "bi-x"}`}></i>
      </button> */}

      <h4 className="logo" style={{fontSize: "30px"}}>Classroom</h4>

      <ul className="nav-links">
        <li>
          <Link to="/">
            <i className="bi bi-house-door"></i> {!collapsed && "Home"}
          </Link>
        </li>
        <li>
          <Link to="/create">
            <i className="bi bi-plus-square"></i> {!collapsed && "Create Class"}
          </Link>
        </li>
        <li>
          <Link to="/join">
            <i className="bi bi-box-arrow-in-right"></i> {!collapsed && "Join Class"}
          </Link>
        </li>
        <li>
          <Link to="/profile">
            <i className="bi bi-person-circle"></i> {!collapsed && "Profile"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
