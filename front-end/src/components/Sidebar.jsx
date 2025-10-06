import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    sessionStorage.removeItem("loggedIn");
    onClose();
    navigate("/");
  };

  return (
    <nav className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}>
      <div className="sidebar-header">
        <h3>Aurora Colony</h3>
        <button className="sidebar-close-button" onClick={onClose}>
            <CloseIcon />
        </button>
      </div>
      <ul>
        <li><NavLink to="/home" onClick={onClose}>Command Center</NavLink></li>
        <li><NavLink to="/dashboard" onClick={onClose}>Locations Panel</NavLink></li>
        <li><NavLink to="/storage" onClick={onClose}>Storage Panel</NavLink></li>
        <li><NavLink to="/supplies" onClick={onClose}>Supply Panel</NavLink></li>
        <li><NavLink to="/plantation" onClick={onClose}>Plantation</NavLink></li>
        <li><NavLink to="/energyroom" onClick={onClose}>Energy Room</NavLink></li>
        <li><NavLink to="/infirmary" onClick={onClose}>Infirmary</NavLink></li>
        <li><NavLink to="/gymroom" onClick={onClose}>Gym Room</NavLink></li>
        <li><NavLink to="/freeroom" onClick={onClose}>Free Room</NavLink></li>
        <li><NavLink to="/observatory" onClick={onClose}>Observatory</NavLink></li>
      </ul>
      <div className="sidebar-footer">
        <a onClick={handleLogout} style={{ cursor: 'pointer', color: '#ff7b72' }}>
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;