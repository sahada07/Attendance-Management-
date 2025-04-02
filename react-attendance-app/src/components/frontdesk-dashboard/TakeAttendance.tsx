import React, { useState } from 'react';
import './TakeAttendance.css';

interface AttendanceRecord {
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  timeIn: string;
  status: 'present' | 'late' | 'absent';
  notes?: string;
}

const TakeAttendance: React.FC = () => {
  const [isClockingIn, setIsClockingIn] = useState(true);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord>({
    employeeId: '',
    employeeName: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    timeIn: new Date().toLocaleTimeString(),
    status: 'present',
    notes: ''
  });

  const handleClockIn = () => {
    setIsClockingIn(true);
    console.log('Clocking in...');
  };

  const handleClockOut = () => {
    setIsClockingIn(false);
    console.log('Clocking out...');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle submission of attendance data
    console.log('Attendance recorded:', attendanceData);
  };

  return (
    <div 
      className="attendance-page" 
      style={{ 
        backgroundImage: `url(${window.location.origin}/assets/wallpaper-attendance.jpg)`
      }}
    >
      <div className="attendance-box">
        <h1>Take Attendance</h1>
        <h2>Clock in to submit your attendance</h2>
        <div className="time-display">
          {new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
        <div className="attendance-buttons">
          <button 
            className={`clock-button clock-in ${isClockingIn ? 'active' : ''}`}
            onClick={handleClockIn}
          >
            <i className="bi bi-box-arrow-in-right"></i>
            Clock In
          </button>
          <button 
            className={`clock-button clock-out ${!isClockingIn ? 'active' : ''}`}
            onClick={handleClockOut}
          >
            <i className="bi bi-box-arrow-right"></i>
            Clock Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance; 