import React, { useState, useEffect } from 'react';
import './LetterForm.css';

interface LetterFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (letter: Omit<Letter, 'id' | 'timestamp'>) => void;
  initialData?: Letter;
}

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

const LetterForm: React.FC<LetterFormProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Omit<Letter, 'id' | 'timestamp'>>({
    type: 'Proposal/Offer Letters',
    sendersName: '',
    receiversName: '',
    department: '',
    date: new Date().toISOString().split('T')[0],
    status: 'received',
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
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{initialData ? 'Edit Letter' : 'Add New Letter'}</h2>
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
              onChange={(e) => setFormData({ ...formData, type: e.target.value as Letter['type'] })}
              required
            >
              <option value="Proposal/Offer Letters">Proposal/Offer Letters</option>
              <option value="Complaint and Response Letters">Complaint and Response Letters</option>
              <option value="Order Letters">Order Letters</option>
              <option value="Confirmation Letters">Confirmation Letters</option>
              <option value="Invitation Letters">Invitation Letters</option>
              <option value="Memos">Memos</option>
              <option value="Recommendation Letters">Recommendation Letters</option>
              <option value="Employment Letters">Employment Letters</option>
              <option value="Financial Letters">Financial Letters</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sendersName">Sender's Name</label>
            <input
              name="sender_name"
              type="text"
              id="sendersName"
              value={formData.sendersName}
              onChange={(e) => setFormData({ ...formData, sendersName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="receiver_name">Receiver's Name</label>
            <input
              name="receiver_name"
              type="text"
              id="receiver_name"
              value={formData.receiversName}
              onChange={(e) => setFormData({ ...formData, receiversName: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              name="department"
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
              name="date"
              // type="date"
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
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Letter['status'] })}
              required
            >
              <option value="received">Received</option>
              <option value="dispatched">Dispatched</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              {initialData ? 'Update' : 'Add'} Letter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LetterForm; 