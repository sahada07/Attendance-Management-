import React, { useState } from 'react';
import './Letters.css';
import LetterForm from './LetterForm';

interface Letter {
  id: number;
  type: 'Proposal/Offer Letters' | 'Complaint and Response Letters' | 'Order Letters' | 'Confirmation Letters' | 'Invitation Letters' | 'Memos Letters' | 'Recommendation Letters';
  sendersName: string;
  receiversName: string;
  department: string;
  date: string;
  status: 'dispatched' | 'received';
  timestamp: string;
  description?: string;
}

const Letters: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLetter, setEditingLetter] = useState<Letter | undefined>();

  // Sample data
  const [letters] = useState<Letter[]>([
    {
      id: 1,
      type: 'Proposal/Offer Letters',
      sendersName: 'John Doe',
      receiversName: 'Jane Smith',
      department: 'Administration',
      date: '2024-03-15',
      status: 'received',
      timestamp: '2024-03-15 09:30:00',
      description: 'Annual budget proposal'
    },
    {
      id: 2,
      type: 'Complaint and Response Letters',
      sendersName: 'Alice Johnson',
      receiversName: 'Bob Wilson',
      department: 'Human Resources',
      date: '2024-03-14',
      status: 'dispatched',
      timestamp: '2024-03-14 14:15:00',
      description: 'Employee grievance'
    }
  ]);

  const handleAddNew = () => {
    setEditingLetter(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (letter: Letter) => {
    setEditingLetter(letter);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (letterData: Omit<Letter, 'id' | 'timestamp'>) => {
    if (editingLetter) {
      // Handle edit
      console.log('Editing letter:', letterData);
    } else {
      // Handle new letter
      console.log('Adding new letter:', letterData);
    }
    setIsFormOpen(false);
    setEditingLetter(undefined);
  };

  const filteredLetters = letters.filter(letter => {
    const matchesSearch = 
      letter.sendersName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.receiversName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      letter.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = !dateFilter || letter.date === dateFilter;
    const matchesType = !typeFilter || letter.type === typeFilter;
    const matchesStatus = !statusFilter || letter.status === statusFilter;
    const matchesDepartment = !departmentFilter || letter.department === departmentFilter;

    return matchesSearch && matchesDate && matchesType && matchesStatus && matchesDepartment;
  });

  return (
    <div className="letters">
      <div className="letters-header">
        <div className="header-content">
          <h2>Letters</h2>
          <button className="add-button" onClick={handleAddNew}>
            <i className="bi bi-plus"></i> Add New Letter
          </button>
        </div>
      </div>

      <div className="filter-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by sender, receiver, or department..."
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
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Proposal/Offer Letters">Proposal/Offer Letters</option>
            <option value="Complaint and Response Letters">Complaint and Response Letters</option>
            <option value="Order Letters">Order Letters</option>
            <option value="Confirmation Letters">Confirmation Letters</option>
            <option value="Invitation Letters">Invitation Letters</option>
            <option value="Memos Letters">Memos Letters</option>
            <option value="Recommendation Letters">Recommendation Letters</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All Status</option>
            <option value="dispatched">Dispatched</option>
            <option value="received">Received</option>
          </select>
          <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
            <option value="">All Departments</option>
            <option value="Administration">Administration</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Finance">Finance</option>
            <option value="Research and Innovation">Research and Innovation</option>
            <option value="Corporate">Corporate</option>
            <option value="IT">IT</option>
            <option value="Consultancy">Consultancy</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>
      </div>

      <div className="letters-table-container">
        <table className="letters-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Sender's Name</th>
              <th>Receiver's Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLetters.map(letter => (
              <tr key={letter.id}>
                <td>{letter.type}</td>
                <td>{letter.sendersName}</td>
                <td>{letter.receiversName}</td>
                <td>{letter.department}</td>
                <td>{letter.date}</td>
                <td>
                  <span className={`status-badge ${letter.status}`}>
                    {letter.status.charAt(0).toUpperCase() + letter.status.slice(1)}
                  </span>
                </td>
                <td>{letter.timestamp}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button view" title="View">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="action-button edit" 
                      title="Edit"
                      onClick={() => handleEdit(letter)}
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

      <LetterForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingLetter(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingLetter}
      />
    </div>
  );
};

export default Letters; 