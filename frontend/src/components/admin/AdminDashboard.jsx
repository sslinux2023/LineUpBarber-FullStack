import React, { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './AdminStyles.css';

const API = 'http://localhost:3000';

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card" style={{ borderLeft: `6px solid ${color}` }}>
    <div className="stat-icon" style={{ color }}>{icon}</div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  </div>
);

const AdminDashboard = ({ token, onLogout }) => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const [orders, setOrders] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const authHeaders = { Authorization: `Bearer ${token}` };

  const fetchAll = useCallback(async () => {
    try {
      const [ordersRes, apptRes, usersRes, prodRes] = await Promise.all([
        fetch(`${API}/orders`, { headers: authHeaders }),
        fetch(`${API}/appointments`, { headers: authHeaders }),
        fetch(`${API}/user`, { headers: authHeaders }),
        fetch(`${API}/products`),
      ]);

      const safeJson = async (res) => {
        if (!res.ok) return [];
        const data = await res.json().catch(() => []);
        return Array.isArray(data) ? data : [];
      };

      setOrders(await safeJson(ordersRes));
      setAppointments(await safeJson(apptRes));
      setUsers(await safeJson(usersRes));
      setProducts(await safeJson(prodRes));
    } catch (err) {
      console.error('Admin fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 15000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // ── derived ───────────────────────────────────
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending').length;

  const getUserForOrder = (order) => {
    if (order.customerName || order.customerEmail) {
      return {
        name: order.customerName || '—',
        email: order.customerEmail || '—',
      };
    }
    if (order.user) {
      return { name: order.user.name || '—', email: order.user.email || '—' };
    }
    return { name: '—', email: '—' };
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString(isAr ? 'ar-MA' : 'fr-MA', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  const productName = (prod) =>
    !prod ? '—' : isAr ? prod.nameAr || prod.name : prod.name;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>{t('admin.title')}</h2>
        <button onClick={onLogout} className="admin-logout-btn">
          {t('admin.logout')}
        </button>
      </div>

      {loading && <p className="admin-loading">{t('admin.loading')}</p>}

      {/* ── STAT CARDS ────────────────────────── */}
      <div className="stat-cards">
        <StatCard icon="🛒" label={t('admin.orders')} value={orders.length} color="#bfa76a" />
        <StatCard icon="💰" label={t('admin.revenue')} value={`${totalRevenue} DH`} color="#28a745" />
        <StatCard icon="⏳" label={t('admin.pending')} value={pendingOrders} color="#e67e22" />
        <StatCard icon="📅" label={t('admin.appointments')} value={appointments.length} color="#007bff" />
        <StatCard icon="👥" label={t('admin.clients')} value={users.filter(u => u.role === 'client').length} color="#17a2b8" />
        <StatCard icon="📦" label={t('admin.products')} value={products.length} color="#6f42c1" />
      </div>

      {/* ── ORDERS ─────────────────────────────── */}
      <div className="admin-section">
        <h3>🛒 {t('admin.orders')}</h3>
        {orders.length === 0 ? (
          <p className="admin-empty">{t('admin.noOrders')}</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>#</th>
                <th>{t('admin.client')}</th>
                <th>{t('admin.items')}</th>
                <th>{t('admin.total')}</th>
                <th>{t('admin.status')}</th>
                <th>{t('admin.date')}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const customer = getUserForOrder(order);
                const itemCount = (order.items || []).reduce(
                  (sum, it) => sum + (it.quantity || 0),
                  0
                );
                const isOpen = expandedOrder === order.id;

                return (
                  <React.Fragment key={order.id}>
                    <tr
                      onClick={() => setExpandedOrder(isOpen ? null : order.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>#{order.id}</td>
                      <td>
                        <strong>{customer.name}</strong>
                        <div className="muted">{customer.email}</div>
                      </td>
                      <td>{itemCount} {itemCount === 1 ? 'item' : 'items'}</td>
                      <td className="price">{order.total} DH</td>
                      <td>
                        <span className={`status-pill status-${order.status || 'pending'}`}>
                          {order.status || 'pending'}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>

                    {isOpen && (
                      <tr className="order-detail-row">
                        <td colSpan={6}>
                          <div className="order-detail">
                            <h4>{t('admin.orderItems')}</h4>
                            <table className="order-items-table">
                              <thead>
                                <tr>
                                  <th>{t('admin.product')}</th>
                                  <th>{t('admin.qty')}</th>
                                  <th>{t('admin.unitPrice')}</th>
                                  <th>{t('admin.lineTotal')}</th>
                                </tr>
                              </thead>
                              <tbody>
                                {(order.items || []).map((it) => (
                                  <tr key={it.id}>
                                    <td>{productName(it.product)}</td>
                                    <td>{it.quantity}</td>
                                    <td>{it.price} DH</td>
                                    <td>{(it.price || 0) * (it.quantity || 0)} DH</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── APPOINTMENTS (with Service column) ─── */}
      <div className="admin-section">
        <h3>📅 {t('admin.appointments')}</h3>
        {appointments.length === 0 ? (
          <p className="admin-empty">{t('admin.noAppointments')}</p>
        ) : (
          <table className="modern-table">
            <thead>
              <tr>
                <th>{t('admin.client')}</th>
                <th>{t('admin.service')}</th>
                <th>{t('admin.date')}</th>
                <th>{t('admin.bookedOn')}</th>
              </tr>
            </thead>
            <tbody>
              {appointments
                .slice()
                .reverse()
                .map((app) => {
                  const svc = app.service
                    ? isAr
                      ? app.service.nameAr || app.service.name
                      : app.service.name
                    : app.serviceName || '—';

                  return (
                    <tr key={app.id}>
                      <td>{app.name}</td>
                      <td>
                        {svc === '—' ? (
                          <span className="muted">—</span>
                        ) : (
                          <span className="service-pill">{svc}</span>
                        )}
                      </td>
                      <td>{formatDate(app.date)}</td>
                      <td>{formatDate(app.createdAt)}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
      </div>

      {/* ── USERS ─────────────────────────────── */}
      <div className="admin-section">
        <h3>👥 {t('admin.users')}</h3>
        <table className="modern-table">
          <thead>
            <tr>
              <th>{t('admin.name')}</th>
              <th>{t('admin.email')}</th>
              <th>{t('admin.role')}</th>
              <th>{t('admin.registered')}</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`role-pill role-${u.role}`}>{u.role}</span>
                </td>
                <td>{formatDate(u.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── PRODUCTS ──────────────────────────── */}
      <div className="admin-section">
        <h3>📦 {t('admin.products')}</h3>
        <table className="modern-table">
          <thead>
            <tr>
              <th></th>
              <th>{t('admin.product')}</th>
              <th>{t('admin.price')}</th>
              <th>{t('admin.sold')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const sold = orders.reduce((sum, o) => {
                const item = (o.items || []).find((i) => i.productId === p.id);
                return sum + (item?.quantity || 0);
              }, 0);

              return (
                <tr key={p.id}>
                  <td>
                    {p.imageUrl && (
                      <img src={p.imageUrl} alt={p.name} className="product-thumb" />
                    )}
                  </td>
                  <td>
                    <strong>{productName(p)}</strong>
                    <div className="muted">{p.description}</div>
                  </td>
                  <td className="price">{p.price} DH</td>
                  <td>{sold}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;