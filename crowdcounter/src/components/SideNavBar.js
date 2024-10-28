import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiMapPin, FiFileText } from 'react-icons/fi'; // Icons from react-icons

function SideNavBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img
          src="https://cdn-icons-png.freepik.com/512/6223/6223334.png" // Placeholder logo
          alt="Logo"
          className="sidebar-logo"
        />
        <h2 className="sidebar-title">Crowd Count</h2>
      </div>

      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <Link to="/" className="sidebar-link">
            <FiHome className="sidebar-icon" />
            Dashboards
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/locations" className="sidebar-link">
            <FiMapPin className="sidebar-icon" />
            Locations
          </Link>
        </li>
        <li className="sidebar-menu-item">
          <Link to="/reports" className="sidebar-link">
            <FiFileText className="sidebar-icon" />
            Reports
          </Link>
        </li>
        {/* <li className="sidebar-menu-item">
          <Link to="/settings" className="sidebar-link">
            <FiSettings className="sidebar-icon" />
            Settings
          </Link>
        </li> */}
      </ul>
    </div>
  );
}

export default SideNavBar;
