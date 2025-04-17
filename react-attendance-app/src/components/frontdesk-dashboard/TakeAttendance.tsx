import React, { useState } from 'react';
import './TakeAttendance.css';
import { attendanceApi } from '../../services/api';

interface ClockInData {
  fullName: string;
  email: string;
  purpose: 'work' | 'lectures' | 'meeting' | 'other';
  phoneNumber: string;
  otherPurpose?: string;
}

const TakeAttendance: React.FC = () => {
  const [isClockingIn, setIsClockingIn] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ClockInData>({
    fullName: '',
    email: '',
    purpose: 'work',
    phoneNumber: '',
    otherPurpose: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Simulated email suggestions - in a real app, this would come from an API or database
  const [emailSuggestions, setEmailSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleClockIn = () => {
    setIsClockingIn(true);
    setShowForm(true);
  };

  const handleClockOut = async () => {
    setIsClockingIn(false);
    try {
      // You'll need to implement the logic to get the attendance ID
      const attendanceId = 1; // This should come from your state management
      const clockOutData = {
        clock_out: new Date().toISOString()
      };
      await attendanceApi.updateAttendance(attendanceId, clockOutData);
      setSuccess('Successfully clocked out!');
    } catch (err) {
      console.error('Error details:', err); // For debugging
      setError('Failed to clock out. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Format the data according to your backend expectations
      const attendanceData = {
        full_name: formData.fullName,
        email: formData.email,
        purpose: formData.purpose === 'other' ? formData.otherPurpose : formData.purpose,
        phone_number: formData.phoneNumber,
        clock_in: new Date().toISOString()
      };

      const response = await attendanceApi.createAttendance(attendanceData);
      console.log('Response:', response); // For debugging
      setSuccess('Attendance recorded successfully!');
      setShowForm(false);
      setFormData({
        fullName: '',
        email: '',
        purpose: 'work',
        phoneNumber: '',
        otherPurpose: ''
      });
    } catch (err) {
      console.error('Error details:', err); // For debugging
      setError('Failed to record attendance. Please try again.');
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    // Simulate email suggestions
    if (value.length > 2) {
      const suggestions = [
        `${value}@company.com`,
        `${value}@organization.com`,
        `${value}@university.edu`
      ];
      setEmailSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setEmailSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectEmailSuggestion = (email: string) => {
    setFormData({ ...formData, email });
    setShowSuggestions(false);
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
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
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

        {!showForm ? (
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
        ) : (
          <form onSubmit={handleSubmit} className="clock-in-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="full_name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="email-input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  required
                />
                {showSuggestions && emailSuggestions.length > 0 && (
                  <div className="email-suggestions">
                    {emailSuggestions.map((email, index) => (
                      <div
                        key={index}
                        className="email-suggestion"
                        onClick={() => selectEmailSuggestion(email)}
                      >
                        {email}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Purpose</label>
              <select
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value as ClockInData['purpose'] })}
                required
              >
                <option value="work">Work</option>
                <option value="lectures">Lectures</option>
                <option value="meeting">Meeting</option>
                <option value="other">Other</option>
              </select>
            </div>

            {formData.purpose === 'other' && (
              <div className="form-group">
                <label htmlFor="otherPurpose">Specify Purpose</label>
                <input
                  type="text"
                  id="otherPurpose"
                  value={formData.otherPurpose}
                  onChange={(e) => setFormData({ ...formData, otherPurpose: e.target.value })}
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phone_number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TakeAttendance; 