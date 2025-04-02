import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'bi-house-door', label: 'Dashboard' },
    { path: '/dashboard/visitors', icon: 'bi-people', label: 'Visitors log' },
    { path: '/dashboard/letters', icon: 'bi-envelope', label: 'Letters' },
    { path: '/dashboard/parcels', icon: 'bi-gift', label: 'Parcels' },
    { path: '/dashboard/attendance', icon: 'bi-clipboard-check', label: 'Attendance Records' },
    { path: '/dashboard/clock', icon: 'bi-clock', label: 'Attendance' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="brand">
        <i className="bi bi-unity"></i>
        <span>Tracksync</span>
        <p>Front Desk</p>
      </div>
      
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <i className={`bi ${item.icon}`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
        <button onClick={handleLogout} className="nav-link logout-btn">
          <i className="bi bi-box-arrow-right"></i>
          <span>Log Out</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar; 