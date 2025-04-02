import React, { useState } from 'react';
import './AttendanceRecords.css';

interface AttendanceRecord {
  id: number;
  fullName: string;
  email: string;
  number: string;
  purpose: string;
  type: 'student' | 'staff';
  date: string;
  clockIn: string;
  clockOut: string | null;
}

const AttendanceRecords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Sample data
  const records: AttendanceRecord[] = [
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@example.com',
      number: '2023001',
      purpose: 'Class',
      type: 'student',
      date: '2024-02-20',
      clockIn: '08:30 AM',
      clockOut: '04:30 PM'
    },
    {
      id: 2,
      fullName: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      number: 'EMP001',
      purpose: 'Teaching',
      type: 'staff',
      date: '2024-02-20',
      clockIn: '07:45 AM',
      clockOut: '05:00 PM'
    },
    // Add more sample records as needed
  ];

  const handleView = (record: AttendanceRecord) => {
    // Handle viewing record details
    console.log('Viewing record:', record);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.number.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDate = !dateFilter || record.date === dateFilter;
    const matchesPurpose = purposeFilter === 'all' || record.purpose.toLowerCase() === purposeFilter.toLowerCase();
    const matchesType = typeFilter === 'all' || record.type === typeFilter;

    return matchesSearch && matchesDate && matchesPurpose && matchesType;
  });

  return (
    <div className="attendance-records">
      <div className="records-header">
        <h2>Attendance Records</h2>
        <div className="filter-controls">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, email, or number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filters">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <select
              value={purposeFilter}
              onChange={(e) => setPurposeFilter(e.target.value)}
            >
              <option value="all">All Purposes</option>
              <option value="class">Class</option>
              <option value="teaching">Teaching</option>
              <option value="meeting">Meeting</option>
              <option value="library">Library</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Purpose</th>
              <th>Type</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(record => (
              <tr key={record.id}>
                <td>{record.fullName}</td>
                <td>{record.email}</td>
                <td>{record.number}</td>
                <td>{record.purpose}</td>
                <td>
                  <span className={`type-badge ${record.type}`}>
                    {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                  </span>
                </td>
                <td>{record.date}</td>
                <td>{record.clockIn}</td>
                <td>{record.clockOut || '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view" 
                      onClick={() => handleView(record)}
                      title="View Details"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceRecords; 