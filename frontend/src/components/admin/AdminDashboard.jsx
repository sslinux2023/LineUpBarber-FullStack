import React, { useEffect, useState } from 'react';
import './AdminStyles.css';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ borderLeft: `6px solid ${color}` }}>
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch('http://localhost:3000/appointments')
      .then(res => res.json())
      .then(setAppointments);

    fetch('http://localhost:3000/user')
      .then(res => res.json())
      .then(setUsers);

    fetch('http://localhost:3000/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  useEffect(() => {
    setStats({
      totalAppointments: appointments.length,
      totalUsers: users.length,
      totalProducts: products.length,
      clients: users.filter(u => u.role === 'client').length,
      admins: users.filter(u => u.role === 'admin').length,
    });
  }, [appointments, users, products]);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stat-cards">
        <StatCard icon="📅" label="Appointments" value={stats.totalAppointments} color="#007bff" />
        <StatCard icon="👤" label="Users" value={stats.totalUsers} color="#28a745" />
        <StatCard icon="🛒" label="Products" value={stats.totalProducts} color="#ffc107" />
        <StatCard icon="🧑" label="Clients" value={stats.clients} color="#17a2b8" />
        <StatCard icon="🛡️" label="Admins" value={stats.admins} color="#6f42c1" />
      </div>
      <div className="admin-section">
        <h3>Recent Appointments</h3>
        <table className="modern-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.slice(-5).reverse().map(app => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{new Date(app.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-section">
        <h3>Products</h3>
        <ul className="modern-list">
          {products.map(prod => (
            <li key={prod.id}>
              <strong>{prod.name}</strong> <span>- {prod.price} DH</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;