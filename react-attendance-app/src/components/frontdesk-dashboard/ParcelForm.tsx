import React, { useState, useEffect } from 'react';
import './ParcelForm.css';

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

interface ParcelFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (parcelData: Omit<Parcel, 'id' | 'timestamp'>) => void;
  initialData?: Parcel;
}

const ParcelForm: React.FC<ParcelFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<Parcel, 'id' | 'timestamp'>>({
    type: 'gift',
    sendersName: '',
    receiversName: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    status: 'received',
    trackingNumber: '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type,
        sendersName: initialData.sendersName,
        receiversName: initialData.receiversName,
        department: initialData.department,
        date: initialData.date,
        status: initialData.status,
        trackingNumber: initialData.trackingNumber || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Parcel' : 'Add New Parcel'}</h2>
          <button className="close-button" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Parcel['type'] })}
              required
            >
              <option value="">Select Type of Parcel</option>
              <option value="gift">Gift</option>
              <option value="package">Package</option>
              <option value="machinery">Machinery</option>
              <option value="food">Food</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sendersName">Sender's Name</label>
            <input
              type="text"
              id="sendersName"
              value={formData.sendersName}
              onChange={(e) => setFormData({ ...formData, sendersName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiversName">Receiver's Name</label>
            <input
              type="text"
              id="receiversName"
              value={formData.receiversName}
              onChange={(e) => setFormData({ ...formData, receiversName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              required
            >
              <option value="">Select Department</option>
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

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Parcel['status'] })}
              required
            >
              <option value="received">Received</option>
              <option value="dispatched">Dispatched</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="trackingNumber">Tracking Number</label>
            <input
              type="text"
              id="trackingNumber"
              value={formData.trackingNumber}
              onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {initialData ? 'Update Parcel' : 'Add Parcel'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ParcelForm; 