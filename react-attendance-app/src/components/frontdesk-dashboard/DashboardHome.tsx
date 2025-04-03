import React from 'react';
import './DashboardHome.css';

const DashboardHome = () => {
  return (
    <div className="dashboard-home">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">259</div>
          <div className="stat-label">Recent Visitors</div>
          <i className="bi bi-people stat-icon"></i>
        </div>
        <div className="stat-card">
          <div className="stat-value">10</div>
          <div className="stat-label">New Parcels</div>
          <i className="bi bi-gift stat-icon"></i>
        </div>
        <div className="stat-card">
          <div className="stat-value">30</div>
          <div className="stat-label">New Letters</div>
          <i className="bi bi-envelope stat-icon"></i>
        </div>
        <div className="stat-card">
          <div className="stat-value">945</div>
          <div className="stat-label">Total Attendance for today</div>
          <i className="bi bi-clipboard-check stat-icon"></i>
        </div>
      </div>

      <div className="recent-orders">
        <div className="section-header">
          <h2>Recent Orders</h2>
          <button className="view-all">View All</button>
        </div>
        <div className="table-responsive">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Star Refrigerator</td>
                <td>$1200</td>
                <td>Paid</td>
                <td><span className="status delivered">Delivered</span></td>
              </tr>
              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td><span className="status return">Return</span></td>
              </tr>
              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td><span className="status inprogress">In Progress</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome; 