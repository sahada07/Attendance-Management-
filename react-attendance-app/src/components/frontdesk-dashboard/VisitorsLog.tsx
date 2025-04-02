import React, { useState } from 'react';
import './VisitorsLog.css';

interface Visitor {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  purpose: 'meeting' | 'other';
  date: string;
  clockIn: string;
  clockOut: string | null;
}

const VisitorsLog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [purposeFilter, setPurposeFilter] = useState('all');

  // Sample data
  const visitors: Visitor[] = [
    {
      id: 1,
      fullName: 'John Smith',
      email: 'john.smith@company.com',
      phoneNumber: '+1234567890',
      purpose: 'meeting',
      date: '2024-02-20',
      clockIn: '09:30 AM',
      clockOut: '10:45 AM'
    },
    {
      id: 2,
      fullName: 'Emma Davis',
      email: 'emma.davis@company.com',
      phoneNumber: '+1987654321',
      purpose: 'other',
      date: '2024-02-20',
      clockIn: '02:15 PM',
      clockOut: null
    },
  ];

  const handleView = (visitor: Visitor) => {
    // Handle viewing visitor details
    console.log('Viewing visitor:', visitor);
  };

  const handleEdit = (visitor: Visitor) => {
    // Handle editing visitor record
    console.log('Editing visitor:', visitor);
  };

  const filteredVisitors = visitors.filter(visitor => {
    const matchesSearch = 
      visitor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phoneNumber.includes(searchTerm);
    
    const matchesDate = !dateFilter || visitor.date === dateFilter;
    const matchesPurpose = purposeFilter === 'all' || visitor.purpose === purposeFilter;

    return matchesSearch && matchesDate && matchesPurpose;
  });

  return (
    <div className="visitor-log">
      <div className="visitor-log-header">
        <h2>Visitor Log</h2>
        <div className="filter-controls">
          <div className="search-box">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, email or phone..."
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
              <option value="meeting">Meeting</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="visitor-log-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVisitors.map(visitor => (
              <tr key={visitor.id}>
                <td>{visitor.fullName}</td>
                <td>{visitor.email}</td>
                <td>{visitor.phoneNumber}</td>
                <td>{visitor.purpose.charAt(0).toUpperCase() + visitor.purpose.slice(1)}</td>
                <td>{visitor.date}</td>
                <td>{visitor.clockIn}</td>
                <td>{visitor.clockOut || '-'}</td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="action-btn view" 
                      onClick={() => handleView(visitor)}
                      title="View Details"
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="action-btn edit" 
                      onClick={() => handleEdit(visitor)}
                      title="Edit Record"
                    >
                      <i className="bi bi-pencil"></i>
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

export default VisitorsLog; 