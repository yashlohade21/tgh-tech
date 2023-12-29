import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLogin from '../Login/AdminLogin';
import StudentLogin from '../Login/StudentLogin';
import Dashboard from '../Dashboard';
import TableStudent from '../Dashboard/TableStudent';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('is_authenticated')));
  }, []);

  const AdminLoginRoute = () => (
    isAuthenticated ? <Navigate to="/dashboard" /> : <AdminLogin setIsAuthenticated={setIsAuthenticated} />
  );

  const StudentLoginRoute = () => (
    isAuthenticated ? <Navigate to="/dashboard" /> : <StudentLogin setIsAuthenticated={setIsAuthenticated} />
  );

  const DashboardRoute = () => (
    isAuthenticated ? <Dashboard setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/admin/login" />
  );

  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLoginRoute />} />
        <Route path="/student/login" element={<StudentLoginRoute />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/*" element={<Navigate to="/admin/login" />} />
        <Route path="/student/dashboard" element={<TableStudent />} />
      </Routes>
    </Router>
  );
};

export default App;
