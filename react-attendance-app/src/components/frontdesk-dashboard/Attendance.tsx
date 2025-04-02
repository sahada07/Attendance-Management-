import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Attendance.css';

const Attendance = () => {
  const navigate = useNavigate();

  const handleStartAttendance = () => {
    // Get the current origin (protocol + hostname + port)
    const origin = window.location.origin;
    // Navigate to the standalone take attendance page
    window.open(`${origin}/take-attendance`, '_blank');
  };

  return (
    <div className="attendance-container">
      <div className="attendance-card">
        <h2>Start Attendance</h2>
        <button 
          className="start-button"
          onClick={handleStartAttendance}
        >
          <i className="bi bi-play-circle"></i>
          Start
        </button>
      </div>
    </div>
  );
};

export default Attendance; 