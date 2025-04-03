import React, { useState } from 'react';
import './Parcels.css';
import ParcelForm from './ParcelForm';

interface Parcel {
  id: number;
  type: 'gift' | 'package' | 'machinery' | 'food';
  sendersName: string;
  receiversName: string;
  department: string;
  date: string;
  status: 'dispatched' | 'received';
  timestamp: string;
  trackingNumber?: string;
  description?: string;
}

const Parcels: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingParcel, setEditingParcel] = useState<Parcel | undefined>();

  // Sample data
  const [parcels] = useState<Parcel[]>([
    {
      id: 1,
      type: 'package',
      sendersName: 'John Doe',
      receiversName: 'Jane Smith',
      department: 'Administration',
      date: '2024-03-15',
      status: 'received',
      timestamp: '2024-03-15 09:30:00',
      trackingNumber: 'TRK123456',
      description: 'Office supplies'
    },
    {
      id: 2,
      type: 'gift',
      sendersName: 'Alice Johnson',
      receiversName: 'Bob Wilson',
      department: 'Human Resources',
      date: '2024-03-14',
      status: 'dispatched',
      timestamp: '2024-03-14 14:15:00',
      trackingNumber: 'TRK789012',
      description: 'Personal items'
    }
  ]);

  const handleAddNew = () => {
    setEditingParcel(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (parcel: Parcel) => {
    setEditingParcel(parcel);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (parcelData: Omit<Parcel, 'id' | 'timestamp'>) => {
    if (editingParcel) {
      // Handle edit
      console.log('Editing parcel:', parcelData);
    } else {
      // Handle new parcel
      console.log('Adding new parcel:', parcelData);
    }
    setIsFormOpen(false);
    setEditingParcel(undefined);
  };

  const filteredParcels = parcels.filter(parcel => {
    const matchesSearch = 
      parcel.sendersName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.receiversName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (parcel.trackingNumber && parcel.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDate = !dateFilter || parcel.date === dateFilter;
    const matchesType = !typeFilter || parcel.type === typeFilter;
    const matchesStatus = !statusFilter || parcel.status === statusFilter;
    const matchesDepartment = !departmentFilter || parcel.department === departmentFilter;

    return matchesSearch && matchesDate && matchesType && matchesStatus && matchesDepartment;
  });

  return (
    <div className="parcels">
      <div className="parcels-header">
        <div className="header-content">
          <h2>Parcels</h2>
          <button className="add-button" onClick={handleAddNew}>
            <i className="bi bi-plus"></i> Add New Parcel
          </button>
        </div>
      </div>

      <div className="filter-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by sender, receiver, department, or tracking number..."
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
            <option value="gift">Gift</option>
              <option value="package">Package</option>
              <option value="machinery">Machinery</option>
              <option value="food">Food</option>
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

      <div className="parcels-table-container">
        <table className="parcels-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Sender's Name</th>
              <th>Receiver's Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Status</th>
              <th>Tracking Number</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredParcels.map(parcel => (
              <tr key={parcel.id}>
                <td>{parcel.type}</td>
                <td>{parcel.sendersName}</td>
                <td>{parcel.receiversName}</td>
                <td>{parcel.department}</td>
                <td>{parcel.date}</td>
                <td>
                  <span className={`status-badge ${parcel.status}`}>
                    {parcel.status.charAt(0).toUpperCase() + parcel.status.slice(1)}
                  </span>
                </td>
                <td>{parcel.trackingNumber || '-'}</td>
                <td>{parcel.timestamp}</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-button view" title="View">
                      <i className="bi bi-eye"></i>
                    </button>
                    <button 
                      className="action-button edit" 
                      title="Edit"
                      onClick={() => handleEdit(parcel)}
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

      <ParcelForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingParcel(undefined);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingParcel}
      />
    </div>
  );
};

export default Parcels; 