import React from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const Admin = ({ token, onLogin, onLogout }) => {
  return (
    <div>
      {!token ? (
        <AdminLogin onLogin={onLogin} />
      ) : (
        <AdminDashboard token={token} onLogout={onLogout} />
      )}
    </div>
  );
};

export default Admin;