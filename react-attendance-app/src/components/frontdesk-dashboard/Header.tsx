import React from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const location = useLocation();
  
  // Function to get the current page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.includes('visitors')) return 'Visitors Log';
    if (path.includes('letters')) return 'Letters';
    if (path.includes('parcels')) return 'Parcels';
    if (path.includes('attendance')) return 'Attendance Records';
    if (path.includes('clock')) return 'Attendance';
    return 'Dashboard';
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={onMenuClick}>
          <i className="bi bi-list"></i>
        </button>
        <h1 className="header-title">{getPageTitle()}</h1>
      </div>
      <div className="header-right">
        <div className="header-actions">
          <div className="notification-bell">
            <i className="bi bi-bell"></i>
            <span className="notification-badge">3</span>
          </div>
          <div className="profile-section">
            <img src="https://via.placeholder.com/40" alt="Profile" className="profile-img" />
            <span className="profile-name">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 