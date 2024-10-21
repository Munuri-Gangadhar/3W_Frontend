import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserSubmissionForm from './components/UserSubmissionForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import "./css/styles.css"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSubmissionForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
