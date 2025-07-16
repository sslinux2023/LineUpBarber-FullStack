import React, { useState, useEffect } from 'react'
import './App.css'
import Home from './components/Home';
import Header from './components/Header'
import Admin from './components/admin/Admin'
import ClientAuth from './components/ClientAuth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import ServicePage from './components/ServicePage';
import TeamPage from './components/TeamPage';
import HoursPage from './components/HoursPage';
import ContactPage from './components/ContactPage';
import AboutPage from './components/AboutPage';
// Main App component for LineUp Barber
function App() {
  // Adding dark/light mode state
  const [darkMode, setDarkMode] = useState(false)
  const toggleDarkMode = () => setDarkMode(!darkMode)

  const [adminMode, setAdminMode] = useState(false)
  const [showClientAuth, setShowClientAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [checkoutMessage, setCheckoutMessage] = useState('')

  // Listen for the custom event to open admin login (optional)
  useEffect(() => {
    const handler = () => setAdminMode(true)
    window.addEventListener('open-admin-login', handler)
    return () => window.removeEventListener('open-admin-login', handler)
  }, [])

  // Handle login: detect admin or client
  const handleLogin = (user) => {
    setUser(user)
    setShowClientAuth(false)
    if (user.role === 'admin') {
      setAdminMode(true)
    } else {
      setAdminMode(false)
    }
  }

  const handleAddToCart = (product) => {
    if (!user) {
      setShowClientAuth(true);
      return;
    }
    setCart([...cart, product]);
  }

  const handleRemoveFromCart = (idx) => {
    setCart(cart.filter((_, i) => i !== idx));
  };

  const handleCheckout = async () => {
    // Here you would send the cart to the backend (see next step)
    setCart([]);
    setCheckoutMessage('Thank you for your order!');
    setTimeout(() => setCheckoutMessage(''), 4000); // Hide after 4 seconds
  }

  return (
    <Router>
      <div className={darkMode ? 'dark-mode' : ''}>
        <Header
          onToggle={toggleDarkMode}
          onLogin={() => setShowClientAuth(true)}
        />
        {cart.length > 0 && (
        <div className="cart">
          <h3>Your Cart</h3>
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>
                {item.name} - {item.price} DH
                <button onClick={() => handleRemoveFromCart(idx)} style={{marginLeft: '1em'}}>Remove</button>
              </li>
            ))}
          </ul>
          <p>
            Total: {cart.reduce((sum, item) => sum + item.price, 0)} DH
          </p>
          <button onClick={handleCheckout}>Checkout</button>
          {checkoutMessage && <div className="checkout-message">{checkoutMessage}</div>}
        </div>
      )}
        {user ? (
          adminMode ? (
            <Admin />
          ) : (
            <div className="welcome-message">
              Welcome, {user.name}!
              <button onClick={() => setUser(null)} style={{ marginLeft: '1em' }}>Logout</button>
            </div>
          )
        ) : (
          <>
            {showClientAuth && (
              <ClientAuth
                onLogin={handleLogin}
              />
            )}
          </>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage onAddToCart={handleAddToCart} />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/opening-times" element={<HoursPage />} />
          <Route path="/contact" element={<ContactPage user={user} setShowClientAuth={setShowClientAuth} />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        {/* Only show Admin Panel button if NOT logged in as client and NOT in admin mode */}
        {!user && !adminMode && (
          <footer>
            {/* You can add footer content here */}
          </footer>
        )}
      </div>
    </Router>
  );
}

export default App
