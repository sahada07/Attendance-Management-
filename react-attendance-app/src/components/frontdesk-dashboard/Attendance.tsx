import React from 'react';
import './Attendance.css';

const Attendance = () => {
  const handleStartAttendance = () => {
    // Handle starting attendance
    console.log('Starting attendance...');
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