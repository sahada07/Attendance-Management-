import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Dashboard from './components/frontdesk-dashboard/Dashboard';
import DashboardHome from './components/frontdesk-dashboard/DashboardHome';
import AttendanceRecords from './components/frontdesk-dashboard/AttendanceRecords';
import Letters from './components/frontdesk-dashboard/Letters'; 
import Parcels from './components/frontdesk-dashboard/Parcels'; 
import VisitorsLog from './components/frontdesk-dashboard/VisitorsLog';
import Attendance from './components/frontdesk-dashboard/Attendance';
import './App.css';

const App = () => {
  // Check authentication status from localStorage
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
        />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
        >
          <Route index element={<DashboardHome />} />
          <Route path="attendance" element={<AttendanceRecords />} />
          <Route path="visitors" element={<VisitorsLog />} />
          <Route path="letters" element={<Letters />} />
          <Route path="parcels" element={<Parcels />} />
          <Route path="clock" element={<Attendance />} />
        </Route>
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;