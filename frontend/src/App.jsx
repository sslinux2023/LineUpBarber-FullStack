import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import WhatsAppButton from './components/WhatsAppButton';
import CartWidget from './components/CartWidget';
import Toast from './components/Toast';
import Home from './components/Home';
import Header from './components/Header';
import Admin from './components/admin/Admin';
import ClientAuth from './components/ClientAuth';
import ProductPage from './components/ProductPage';
import ServicePage from './components/ServicePage';
import TeamPage from './components/TeamPage';
import HoursPage from './components/HoursPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const [adminMode, setAdminMode] = useState(false);
  const [showClientAuth, setShowClientAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [checkingOut, setCheckingOut] = useState(false);

  // ── Restore session from localStorage on first load ──
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser({ ...parsed, access_token: storedToken });
        if (parsed.role === 'admin') setAdminMode(true);
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
  }, []);

  // ── Admin login trigger ──
  useEffect(() => {
    const handler = () => setAdminMode(true);
    window.addEventListener('open-admin-login', handler);
    return () => window.removeEventListener('open-admin-login', handler);
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    setShowClientAuth(false);
    setAdminMode(u.role === 'admin');

    // persist so a refresh keeps the session
    if (u.access_token) {
      localStorage.setItem('token', u.access_token);
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
        })
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAdminMode(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('admin_token');
  };

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowClientAuth(true);
      return;
    }

    if (cart.length === 0) return;

    setCheckingOut(true);
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({ productId: item.id, quantity: 1 })),
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || 'Checkout failed');
      }

      const order = await response.json();
      setCart([]);
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: {
            type: 'success',
            text: `✓ Thank you! Your order #${order.id} has been placed. We'll contact you shortly to confirm.`,
          },
        })
      );
    } catch (err) {
      window.dispatchEvent(
        new CustomEvent('toast', {
          detail: { type: 'error', text: 'Checkout failed: ' + err.message },
        })
      );
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <Router>
      <AppContent
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        adminMode={adminMode}
        showClientAuth={showClientAuth}
        setShowClientAuth={setShowClientAuth}
        user={user}
        cart={cart}
        checkingOut={checkingOut}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleAddToCart={handleAddToCart}
        handleRemoveFromCart={handleRemoveFromCart}
        handleCheckout={handleCheckout}
      />
    </Router>
  );
}

function AppContent({
  darkMode,
  toggleDarkMode,
  adminMode,
  showClientAuth,
  setShowClientAuth,
  user,
  cart,
  checkingOut,
  handleLogin,
  handleLogout,
  handleAddToCart,
  handleRemoveFromCart,
  handleCheckout,
}) {
  const location = useLocation();

  useEffect(() => {
    setShowClientAuth(false);
  }, [location.pathname, setShowClientAuth]);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Header
        onToggle={toggleDarkMode}
        onLogin={() => setShowClientAuth(true)}
        user={user}
        onLogout={handleLogout}
      />

      {showClientAuth && (
        <ClientAuth
          onLogin={handleLogin}
          onClose={() => setShowClientAuth(false)}
        />
      )}

      <main className="app-main">
        {user && adminMode ? (
  <Admin
    token={localStorage.getItem('token')}
    onLogin={handleLogin}
    onLogout={handleLogout}
  />
) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={<ProductPage onAddToCart={handleAddToCart} />}
            />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/opening-times" element={<HoursPage />} />
            <Route
              path="/contact"
              element={
                <ContactPage
                  user={user}
                  setShowClientAuth={setShowClientAuth}
                />
              }
            />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        )}
      </main>
     <WhatsAppButton />

      <CartWidget
        cart={cart}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        checkingOut={checkingOut}
      />
      <Toast />

      <footer>
        © {new Date().getFullYear()} LineUp Barber — Where your look is our craft
      </footer>
    </div>
  );
}

export default App;